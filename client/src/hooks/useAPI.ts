import { LogInInfo, Metadata, Post, User } from '../types';
import { useApiClient } from './useAPIClient';
import { useAuth } from './useAuth';

export const useAPI = () => {
    const { logOut: logOutFromStorage } = useAuth();
    const apiClient = useApiClient();

    return {
        user: {
            create: async (user: Pick<User, 'username' | 'password' | 'email'>) =>
                (await apiClient.post<User>('/users', user)).data,
            logIn: async (username: string, password: string) =>
                (await apiClient.post<LogInInfo>('/auth/login', { username, password })).data,
            updateUser: async (username: string, user: Partial<Omit<User, 'password'>>) =>
                (await apiClient.patch<User>(`/users/${username}`, user)).data,
            logOut: async (refreshToken: string) => {
                await apiClient.post<void>('/auth/logout', { refreshToken });
                logOutFromStorage();
            },
        },
        post: {
            getPosts: async (pageNumber: number) =>
                (await apiClient.get<{ posts: Post[]; metadata: Metadata }>(`/posts?page=${pageNumber}`)).data,
            getUserPosts: async (userId: string) =>
                (await apiClient.get<{ posts: Post[] }>(`/posts/users/${userId}`)).data,
            like: async (postId: string) => await apiClient.post(`/likes/${postId}`, {}),
            dislike: async (postId: string) => await apiClient.delete(`/likes/${postId}`),
            delete: async (postId: string) => await apiClient.delete(`/posts/${postId}`),
            create: async (post: Pick<Post, 'user' | 'content' | 'title' | 'externalMovieId' | 'photoUrl' | 'rate'>) =>
                await apiClient.post('/posts', post),
        },
    };
};
