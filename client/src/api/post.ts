import { Metadata, Post } from '../types';

const posts: Post[] = [
    { _id: '1', title: '1', content: 'Content', username: 'a', likes: ['ido', 'b'], commentsNumber: 4 },
    { _id: '2', title: '2', content: 'Content', username: 'b', likes: ['a', 'b'], commentsNumber: 3 },
    { _id: '3', title: '3', content: 'Content', username: 'c', likes: ['a'], commentsNumber: 7 },
    { _id: '4', title: '4', content: 'Content', username: 'd', likes: ['ido', 'c'], commentsNumber: 2 },
    { _id: '5', title: '5', content: 'Content', username: 'b', likes: ['a', 'b', 'e'], commentsNumber: 1 },
    { _id: '6', title: '6', content: 'Content', username: 'c', likes: ['f'], commentsNumber: 45 },
    { _id: '7', title: '7', content: 'Content', username: 'a', likes: ['c', 'b'], commentsNumber: 12 },
    { _id: '8', title: '8', content: 'Content', username: 'd', likes: ['ido', 'b'], commentsNumber: 23 },
    { _id: '9', title: '9', content: 'Content', username: 'e', likes: ['e', 'b'], commentsNumber: 24 },
    { _id: '10', title: '10', content: 'Content', username: 'f', likes: ['d'], commentsNumber: 32 },
    { _id: '11', title: '11', content: 'Content', username: 'e', likes: ['d'], commentsNumber: 32 },
    { _id: '12', title: '12', content: 'Content', username: 'a', likes: ['d'], commentsNumber: 32 },
];

export const getPosts = async (pageNumber: number): Promise<{ data: Post[]; metadata: Metadata }> => {
    const pageSize = 5;

    const response = {
        data: posts.slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
        metadata: {
            hasNext: posts.length > pageNumber * pageSize,
            nextPage: pageNumber + 1,
        },
    };

    return new Promise((resolve) => setTimeout(() => resolve(response), 500));
};
