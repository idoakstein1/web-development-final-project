import { Metadata, Post } from '../types';
import { getAxios } from './axios';

export const getPosts = async (pageNumber: number, token: string) =>
    (
        await getAxios().get<{ posts: Post[]; metadata: Metadata }>(`/posts?page=${pageNumber}`, {
            headers: { Authorization: `bearer ${token}` },
        })
    ).data;

export const getUserPosts = async (userId: string, token: string) =>
    (
        await getAxios().get<{ posts: Post[] }>(`/posts/users/${userId}`, {
            headers: { Authorization: `bearer ${token}` },
        })
    ).data;
