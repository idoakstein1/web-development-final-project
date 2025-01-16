import { Post } from '../types';

const posts: Post[] = [
    { _id: '1', title: 'Title', content: 'Content', username: 'a', likes: ['ido', 'b'], commentsNumber: 4 },
    { _id: '2', title: 'Title', content: 'Content', username: 'b', likes: ['a', 'b'], commentsNumber: 3 },
    { _id: '3', title: 'Title', content: 'Content', username: 'c', likes: ['a'], commentsNumber: 7 },
    { _id: '4', title: 'Title', content: 'Content', username: 'd', likes: ['ido', 'c'], commentsNumber: 2 },
    { _id: '5', title: 'Title', content: 'Content', username: 'b', likes: ['a', 'b', 'e'], commentsNumber: 1 },
    { _id: '6', title: 'Title', content: 'Content', username: 'c', likes: ['f'], commentsNumber: 45 },
    { _id: '7', title: 'Title', content: 'Content', username: 'a', likes: ['c', 'b'], commentsNumber: 12 },
    { _id: '8', title: 'Title', content: 'Content', username: 'd', likes: ['ido', 'b'], commentsNumber: 23 },
    { _id: '9', title: 'Title', content: 'Content', username: 'e', likes: ['e', 'b'], commentsNumber: 24 },
    { _id: '10', title: 'Title', content: 'Content', username: 'f', likes: ['d'], commentsNumber: 32 },
];

export const getPosts = async () => new Promise<Post[]>((resolve) => setTimeout(() => resolve(posts), 1000));
