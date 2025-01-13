import { User } from '../types';
import { getAxios } from './axios';

export const createUser = async (user: User) => await getAxios().post('/users', user);
