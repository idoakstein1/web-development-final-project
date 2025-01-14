import { User } from '../types';
import { createUser, logIn } from './user';

export const API = {
    user: {
        create: (user: User) => createUser(user),
        logIn: (username: string, password: string) => logIn(username, password),
    },
};
