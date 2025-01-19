import { Post, User } from '../types';
import { createPost, dislikePost, getPosts, getUserPosts, likePost } from './post';
import { createUser, logInUser, logOutUser, updateUser } from './user';

export const API = {
    user: {
        create: (user: Pick<User, 'username' | 'password' | 'email'>) => createUser(user),
        logIn: (username: string, password: string) => logInUser(username, password),
        updateUser: (username: string, user: Partial<Omit<User, 'password'>>, token: string) =>
            updateUser(username, user, token),
        logOut: (token: string) => logOutUser(token),
    },
    post: {
        getPosts: (pageNumber: number, token: string) => getPosts(pageNumber, token),
        getUserPosts: (userId: string, token: string) => getUserPosts(userId, token),
        like: (postId: string, token: string) => likePost(postId, token),
        dislike: (postId: string, token: string) => dislikePost(postId, token),
        create: (
            post: Pick<Post, 'user' | 'content' | 'title' | 'externalMovieId' | 'photoUrl' | 'rate'>,
            token: string
        ) => createPost(post, token),
    },
};
