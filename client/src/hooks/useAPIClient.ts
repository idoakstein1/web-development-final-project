import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { LogInInfo } from '../types';
import { useAuth } from './useAuth';

type AxiosInterceptorError = AxiosError<{ message: string }> & { config: AxiosRequestConfig & { _retry?: boolean } };

export const useApiClient = () => {
    const { accessToken, refreshToken, setAccessToken, setRefreshToken } = useAuth();

    const axiosInstance = axios.create({ baseURL: 'http://localhost:3030' });

    axiosInstance.interceptors.request.use(
        (config) => {
            const isPublicRoute =
                config.url?.includes('auth') || (config.url?.includes('users') && config.method === 'post');
            const token = accessToken;
            if (!isPublicRoute && token) {
                config.headers.Authorization = `bearer ${accessToken}`;
            }

            return config;
        },
        (error: AxiosError) => {
            throw error;
        }
    );

    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error: AxiosInterceptorError) => {
            const { config: originalRequest, response } = error;

            if (!originalRequest || !response) {
                throw error;
            }

            const hasTokenExpired = response?.status === 401 && response.data.message === 'token is invalid';
            if (hasTokenExpired && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = (
                        await axiosInstance.post<Omit<LogInInfo, 'user'>>('/auth/refresh', { refreshToken })
                    ).data;

                    setAccessToken(newAccessToken);
                    setRefreshToken(newRefreshToken);

                    return;
                } catch (refreshError) {
                    console.error('Error refreshing token:', refreshError);
                    throw refreshError;
                }
            }

            throw error;
        }
    );

    return axiosInstance;
};
