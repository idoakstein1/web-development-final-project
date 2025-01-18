import { LogInInfo, User } from '../types';
import { getAxios } from './axios';

export const createUser = async (user: User) => (await getAxios().post<User>('/users', user)).data;

export const logInUser = async (username: string, password: string) =>
    (await getAxios().post<LogInInfo>('/auth/login', { username, password })).data;

export const updateUser = async (username: string, user: Partial<Omit<User, 'password'>>, token: string) =>
    (await getAxios().patch<User>(`/users/${username}`, user, { headers: { Authorization: `bearer ${token}` } })).data;

export const logOutUser = async (token: string) => await getAxios().post<void>('/auth/logout', { refreshToken: token });
