import { Content } from './Content';

export type User = {
    _id: string;
    username: string;
    email: string;
    password: string;
    likes: string[];
    watchLater: Content[];
    profilePicture: string;
};
