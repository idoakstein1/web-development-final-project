import { Router } from 'express';
import { isValidObjectId } from 'mongoose';
import { createPost, deletePost, editPost, getPostById, getPosts, getPostsByUserId, getUserById } from '../dal';
import { asyncHandler } from '../errors/asyncHandler';
import { getItemById } from '../services';

export const postRouter = Router();

postRouter.post(
    '/',
    asyncHandler(async (req, res) => {
        const { user, content, title, externalMovieId, photoUrl, rate } = req.body;
        if (!user || !title || !user.username || !user._id || !externalMovieId || !photoUrl || !rate) {
            res.status(400).send({
                message: 'body param is missing (user (username, _id), title, externalMovieId, photoUrl, rate)',
            });
            return;
        }

        if (!isValidObjectId(user._id)) {
            res.status(400).send({ message: `id: ${user._id} is not valid` });
            return;
        }
        const userId = res.locals.user._id;

        const userFromDB = await getUserById(user._id);

        if (userId !== user._id || !userFromDB || userFromDB.username !== user.username) {
            res.status(400).send({ message: `sender with id: ${user._id} doesn't exists` });
            return;
        }

        const post = await createPost({
            post: { title, user, content, externalMovie: await getItemById(externalMovieId), photoUrl, rate },
        });
        res.status(200).send(post);
    })
);

postRouter.get(
    '/:id',
    asyncHandler(async (req, res) => {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            res.status(400).send({ message: `id: ${id} is not valid` });
            return;
        }

        const post = await getPostById(id);
        if (!post) {
            res.status(404).send({ message: `didn't find post with id: ${id}` });
            return;
        }

        res.status(200).send({ post });
    })
);

postRouter.put(
    '/:id',
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        if (!isValidObjectId(id)) {
            res.status(400).send({ message: `post with id: ${id} doesn't exist` });
            return;
        }
        const post = await getPostById(id);

        const { content, title, photoUrl, rate } = req.body;

        const userId = res.locals.user._id;

        if (post === null || !post.user || post.user._id.toString() !== userId) {
            res.status(403).send({ message: 'you are not allowed to edit this post' });
            return;
        }

        if (!content && !title && !photoUrl && !rate) {
            res.status(400).send({ message: 'no data to update' });
            return;
        }

        const updatedPost = await editPost({
            postId: id,
            dataToUpdate: {
                content,
                title,
                photoUrl,
                rate,
            },
        });

        res.status(200).send(updatedPost);
    })
);

postRouter.delete(
    '/:id',
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        if (!isValidObjectId(id)) {
            res.status(400).send({ message: `Invalid post id` });
            return;
        }

        const post = await getPostById(id);

        if (!post || post === null) {
            res.status(404).send({ message: `post with id: ${id} doesn't exist` });
            return;
        }

        const userId = res.locals.user._id;

        if (!post.user || post.user._id.toString() !== userId) {
            res.status(403).send({ message: 'you are not allowed to delete this post' });
            return;
        }

        await deletePost(id);

        res.status(200).send({ message: 'post deleted' });
    })
);

postRouter.get(
    '/',
    asyncHandler(async (req, res) => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 5;

        const userId = res.locals.user._id;

        res.status(200).send(await getPosts({ userId, page, limit }));
    })
);

postRouter.get(
    '/users/:userId',
    asyncHandler(async (req, res) => {
        const userId = req.params.userId;
        if (!isValidObjectId(userId)) {
            res.status(400).send({ message: `Invalid user id` });
            return;
        }
        const user = await getUserById(userId);
        if (!user) {
            res.status(404).send({ message: `user with id: ${userId} doesn't exist` });
            return;
        }

        const posts = await getPostsByUserId(userId);
        res.status(200).send({ posts });
    })
);
