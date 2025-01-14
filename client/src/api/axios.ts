import axios, { AxiosInstance } from 'axios';

let axiosInstance: AxiosInstance;

export const getAxios = () => {
    if (axiosInstance) {
        return axiosInstance;
    }

    axiosInstance = axios.create({
        baseURL: 'http://localhost:8080',
    });

    return axiosInstance;
};
