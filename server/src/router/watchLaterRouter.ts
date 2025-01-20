import { Router } from 'express';
import { asyncHandler } from '../errors/asyncHandler';
import { overwriteWatchLater, getWatchLater } from '../dal';
import { addToWatchLater } from '../bl';

export const watchLaterRouter = Router();

watchLaterRouter.post(
    '/:postId',
    asyncHandler(async (req, res) => {
        const { postId } = req.params;
        const userId = res.locals.user._id;

        if (!postId) {
            res.status(400).send({
                message: 'param is missing (title)',
            });
            return;
        }

        await addToWatchLater({ userId, postId });

        res.status(200).send({ userId, postId });
    })
);

watchLaterRouter.put(
    '/',
    asyncHandler(async (req, res) => {
        const { watchLater } = req.body;
        if (!watchLater || !Array.isArray(watchLater)) {
            res.status(400).send({
                message: 'body param is missing (watchLater)',
            });
            return;
        }

        const userId = res.locals.user._id;

        await overwriteWatchLater(userId, watchLater);

        res.status(200).send({ userId, watchLater });
    })
);

watchLaterRouter.get(
    '/',
    asyncHandler(async (req, res) => {
        const userId = res.locals.user._id;

        const watchLater = await getWatchLater(userId);

        res.status(200).send(watchLater);
    })
);
