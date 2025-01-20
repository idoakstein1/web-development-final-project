import { createComment as createCommentInDB, getPostById } from '../dal';
import { ApiError } from '../errors/ApiError';
import { Comment } from '../models';

export const createComment = async (comment: Omit<Comment, 'createdAt'>) => {
    const post = await getPostById(comment.postId.toString());
    if (!post) {
        throw new ApiError({
            status: 404,
            message: `post with id: ${comment.postId.toString()} doesn't exists`,
        });
    }

    post.commentsCount += 1;
    await Promise.all([post.save(), createCommentInDB(comment)]);
};
