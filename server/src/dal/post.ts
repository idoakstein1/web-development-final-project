import { Post, postModel } from '../models';

export const createPost = async ({
    post,
}: {
    post: Omit<Post, 'likes' | 'createdAt' | 'updatedAt' | 'commentsCount'>;
}) => await postModel.create(post);

export const getPostById = async (id: string) => await postModel.findById(id).select('-__v');

export const editPost = async ({
    postId,
    dataToUpdate,
}: {
    postId: string;
    dataToUpdate: Partial<Pick<Post, 'content' | 'photoUrl' | 'title' | 'rate'>>;
}) => await postModel.updateOne({ _id: postId }, { ...dataToUpdate, updatedAt: Date.now() });

export const deletePost = async (postId: string) => await postModel.deleteOne({ _id: postId });

export const getPosts = async ({ userId, page, limit }: { userId: string; page: number; limit: number }) => {
    const posts = await postModel
        .find()
        .where('user._id')
        .ne(userId)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .select('-__v');

    const totalPages = Math.ceil((await postModel.countDocuments()) / limit);

    return { posts, metadata: { hasNext: page < totalPages, nextPage: page < totalPages ? page + 1 : null } };
};

export const getPostsByUserId = async (userId: string) => {
    return await postModel.find({ 'user._id': userId }).select('-__v');
};

export const getFavoritePosts = async (userId: string) => {
    return await postModel
        .find({ 'user._id': userId })
        .find()
        .where('user._id')
        .equals(userId)
        .where('rate')
        .gte(4)
        .select('-__v');
};
