import { Router } from 'express';
import { isValidObjectId } from 'mongoose';
import { getCommentsByPostId, getPostById, getUserById } from '../dal';
import { createComment } from '../bl';
import { asyncHandler } from '../errors/asyncHandler';

export const commentRouter = Router();

commentRouter.post(
    '/',
    asyncHandler(async (req, res) => {
        const { user, content, postId } = req.body;
        if (!user || !postId || !user.username || !user._id || !user.profilePicture) {
            res.status(400).send({ message: 'body param is missing (user, content or postId)' });
            return;
        }

        if (!isValidObjectId(postId)) {
            res.status(400).send({ message: `postId is invalid` });
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

commentRouter.get(
    '/post/:postId',
    asyncHandler(async (req, res) => {
        const { postId } = req.params;
        if (!isValidObjectId(postId) || (await getPostById(postId)) === null) {
            res.status(400).send({ message: `post with id: ${postId} doesn't exists` });
            return;
        }

        const comments = await getCommentsByPostId(postId);

        res.status(200).send({ comments });
    })
);
