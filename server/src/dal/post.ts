import { Post, postModel } from '../models';

export const createPost = async ({ post }: { post: Omit<Post, 'likes' | 'createdAt' | 'updatedAt'> }) =>
    await postModel.create(post);

export const getPostById = async (id: string) => await postModel.findById(id).select('-__v');

export const editPost = async ({
    postId,
    dataToUpdate,
}: {
    postId: string;
    dataToUpdate: Partial<Pick<Post, 'content' | 'photoUrl' | 'title' | 'rate'>>;
}) => await postModel.updateOne({ _id: postId }, { ...dataToUpdate, updatedAt: Date.now() });

export const deletePost = async (postId: string) => await postModel.deleteOne({ _id: postId });

export const getPosts = async ({ page, limit }: { page: number; limit: number }) => {
    return await postModel
        .find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .select('-__v');
};

export const getPostsByUserId = async (userId: string) => {
    return await postModel.find({ 'user._id': userId }).select('-__v');
};
