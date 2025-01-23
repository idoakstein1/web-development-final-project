import { Comment, Content, LogInInfo, Metadata, Post, User } from '../types';
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
                await apiClient.post('/auth/logout', { refreshToken });
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
            create: async ({
                photo,
                externalMovie,
                ...post
            }: Pick<Post, 'content' | 'title' | 'rate' | 'user' | 'externalMovie'> & { photo?: File }) => {
                let fileName;
                if (photo) {
                    const formData = new FormData();
                    formData.append('file', photo);
                    fileName = (await apiClient.post<{ url: string }>('/file', formData)).data.url;
                }

                await apiClient.post('/posts', {
                    ...post,
                    externalMovieId: externalMovie.id,
                    photoUrl: fileName || externalMovie.poster,
                });
            },
            update: async (
                postId: string,
                { photo, ...post }: Partial<Pick<Post, 'content' | 'title' | 'rate'> & { photo: File }>
            ) => {
                let fileName;
                if (photo) {
                    const formData = new FormData();
                    formData.append('file', photo);
                    fileName = (await apiClient.post<{ url: string }>('/file', formData)).data.url;
                }

                await apiClient.put(`/posts/${postId}`, { ...post, photoUrl: fileName });
            },
        },
        comment: {
            getByPost: async (postId: string) =>
                (await apiClient.get<{ comments: Comment[] }>(`/comments/post/${postId}`)).data,
            create: async (comment: Pick<Comment, 'content' | 'user' | 'postId'>) =>
                await apiClient.post('/comments', comment),
        },
        content: {
            search: async (title: string, type: string) =>
                (await apiClient.get<{ items: Content[] }>('/content/search', { params: { title, type } })).data,
        },
        watchLater: {
            add: async (contentId: string) => await apiClient.post(`/watch-later/${contentId}`, {}),
            get: async () => (await apiClient.get<{ watchLater: Content[] }>('/watch-later')).data,
            update: async (watchLater: string[]) => await apiClient.put('/watch-later', { watchLater }),
        },
        recommendation: {
            // This is here to not waste the token
            // get: async () => (await apiClient.get<{ movies: Content[]; series: Content[] }>('/recommended')).data,
            get: async () => ({ movies: [], series: [] }),
        },
    };
};
