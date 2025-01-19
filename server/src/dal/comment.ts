import { Comment, commentModel } from '../models';

export const deleteComment = async (commentId: string) => await commentModel.deleteOne({ _id: commentId });

export const getCommentsByPostID = async (postID: string) => await commentModel.find({ postID }).select('-__v');

export const createComment = async (comment: Comment) => await commentModel.create(comment);

export const editComment = async (comment: Partial<Omit<Comment, 'postID'>>, id: string) =>
    await commentModel.findByIdAndUpdate(id, comment);

export const getCommentByID = async (_id: string) => await commentModel.findOne({ _id }).select('-__v');
