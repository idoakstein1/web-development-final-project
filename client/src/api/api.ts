import { User } from '../types';
import { getPosts } from './post';
import { createUser, logIn, updateUser } from './user';

export const API = {
    user: {
        create: (user: User) => createUser(user),
        logIn: (username: string, password: string) => logIn(username, password),
        updateUser: (username: string, user: Partial<Omit<User, 'password'>>, token: string) =>
            updateUser(username, user, token),
    },
    post: {
        getPosts: (pageNumber: number) => getPosts(pageNumber),
    },
};
