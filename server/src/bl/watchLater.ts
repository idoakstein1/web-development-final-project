import { getUserById } from '../dal';
import { ApiError } from '../errors/ApiError';

export const addToWatchLater = async ({ userId, postId }: { userId: string; postId: string }) => {
    const user = await getUserById(userId);

    if (user?.watchLater.includes(postId)) {
        throw new ApiError({
            message: 'post already in watch later',
            status: 400,
        });
    }
    user?.watchLater.push(postId);

    user?.save();
};
