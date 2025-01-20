import { Comment, commentModel } from '../models';

export const getCommentsByPostId = async (postId: string) =>
    await commentModel.find({ postId }).sort({ createdAt: -1 }).select('-__v');

export const createComment = async (comment: Omit<Comment, 'createdAt'>) => await commentModel.create(comment);
