import { User } from './User';

export type LogInInfo = {
    accessToken: string;
    refreshToken: string;
    user: Omit<User, 'password'>;
};
