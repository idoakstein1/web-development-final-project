import { Router } from 'express';
import { isValidObjectId } from 'mongoose';
import { getPostById, getUserById } from '../dal';
import { createComment } from '../bl';
import { asyncHandler } from '../errors/asyncHandler';

export const commentRouter = Router();

commentRouter.post(
    '/',
    asyncHandler(async (req, res) => {
        const { user, content, postId } = req.body;
        if (!user || !postId || !user.username || !user._id) {
            res.status(400).send({ message: 'body param is missing (user content or postId)' });
            return;
        }

        if (!isValidObjectId(user._id) || (await getUserById(user._id)) === null) {
            res.status(400).send({ message: `sender with id: ${user._id} doesn't exists` });
            return;
        }

        await createComment({ user, content, postId });

        res.status(200).send({ user, content, postId });
    })
);
