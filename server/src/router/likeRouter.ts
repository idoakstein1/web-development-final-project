import { Router } from 'express';
import { isValidObjectId } from 'mongoose';
import { asyncHandler } from '../errors/asyncHandler';
import { likePost } from '../bl';
import { unlikePost } from '../bl/like';
import { getUserLikesById } from '../dal';

export const likeRouter = Router();

likeRouter.post(
    '/:id',
    asyncHandler(async (req, res) => {
        const { id: postId } = req.params;
        const userId = res.locals.user._id;
        if (!postId) {
            res.status(400).send({
                message: 'body param is missing (postId)',
            });
            return;
        }

        if (!isValidObjectId(postId)) {
            res.status(400).send({ message: `id: ${postId} is not valid` });
            return;
        }

        await likePost({ postId, userId });

        res.status(200).send({ postId, userId });
    })
);

likeRouter.delete(
    '/:id',
    asyncHandler(async (req, res) => {
        const { id: postId } = req.params;
        const userId = res.locals.user._id;
        if (!postId) {
            res.status(400).send({
                message: 'body param is missing (postId)',
            });
            return;
        }

        if (!isValidObjectId(postId)) {
            res.status(400).send({ message: `id: ${postId} is not valid` });
            return;
        }

        await unlikePost({ postId, userId });

        res.status(200).send({ postId, userId });
    })
);

likeRouter.get(
    '/',
    asyncHandler(async (req, res) => {
        const userId = res.locals.user._id;
        const userLikes = await getUserLikesById(userId);
        res.status(200).send(userLikes);
    })
);
