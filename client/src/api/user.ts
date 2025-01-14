import { LogInInfo, User } from '../types';
import { getAxios } from './axios';

export const createUser = async (user: User) => (await getAxios().post<User>('/users', user)).data;

export const logIn = async (username: string, password: string) =>
    (await getAxios().post<LogInInfo>('/auth/login', { username, password })).data;
