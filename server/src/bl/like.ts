import { getUserLikesById, getPostById } from '../dal';
import { ApiError } from '../errors/ApiError';

export const likePost = async ({ postId, userId }: { postId: string; userId: string }) => {
    const post = await getPostById(postId);
    if (!post) {
        throw new ApiError({
            status: 404,
            message: `postId: ${postId} not found`,
        });
    }

    const userLikes = await getUserLikesById(userId);
    if (userLikes?.likes.includes(postId)) {
        throw new ApiError({
            status: 400,
            message: `postId: ${postId} already liked`,
        });
    }

    userLikes?.likes.push(postId);
    post.likes += 1;
    await Promise.all([userLikes?.save(), post.save()]);
};

export const unlikePost = async ({ postId, userId }: { postId: string; userId: string }) => {
    const post = await getPostById(postId);
    if (!post) {
        throw new ApiError({
            status: 404,
            message: `postId: ${postId} not found`,
        });
    }

    const userLikes = await getUserLikesById(userId);
    if (!userLikes?.likes.includes(postId)) {
        throw new ApiError({
            status: 400,
            message: `postId: ${postId} not liked`,
        });
    }

    userLikes.likes = userLikes.likes.filter((like) => like !== postId);
    post.likes -= 1;
    await Promise.all([userLikes.save(), post.save()]);
};
