import { Comment, commentModel } from '../models';

export const getCommentsByPostId = async (postId: string) => await commentModel.find({ postId }).select('-__v');

export const createComment = async (comment: Comment) => await commentModel.create(comment);
