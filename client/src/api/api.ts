import { User } from '../types';
import { createUser } from './user';

export const API = {
    user: {
        create: (user: User) => createUser(user),
    },
};
