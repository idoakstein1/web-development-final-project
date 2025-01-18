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

export const likePost = async (postId: string, token: string) =>
    await getAxios().post(`/likes/${postId}`, {}, { headers: { Authorization: `bearer ${token}` } });

export const dislikePost = async (postId: string, token: string) =>
    await getAxios().delete(`/likes/${postId}`, { headers: { Authorization: `bearer ${token}` } });

export const createPost = async (
    post: Pick<Post, 'user' | 'content' | 'title' | 'externalMovieId' | 'photoUrl' | 'rate'>,
    token: string
) => await getAxios().post('/posts', post, { headers: { Authorization: `bearer ${token}` } });
