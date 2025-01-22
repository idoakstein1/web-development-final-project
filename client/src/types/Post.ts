import { Content } from './Content';

export type Post = {
    _id: string;
    title: string;
    content: string;
    externalMovie: Content;
    photoUrl: string;
    likes: number;
    createdAt: Date;
    updatedAt: Date;
    rate: number;
    user: { _id: string; username: string };
    commentsCount: number;
};
