import { getUserById } from '../dal';
import { ApiError } from '../errors/ApiError';
import { getItemById } from '../services/';

export const addToWatchLater = async ({ userId, postId }: { userId: string; postId: string }) => {
    const user = await getUserById(userId);

    if (user && user.watchLater && user.watchLater.filter((content) => content.id === postId).length === 1) {
        throw new ApiError({
            message: 'post already in watch later',
            status: 400,
        });
    }

    const contentData = await getItemById(postId);

    user?.watchLater.push(contentData);

    user?.save();
};
