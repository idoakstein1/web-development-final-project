import { Router } from 'express';
import { isUsernameExists, findUserByUsername, getUserById } from '../dal';
import { createUser, updateUser } from '../bl';
import { asyncHandler } from '../errors/asyncHandler';

export const userRouter = Router();

userRouter.post(
    '/',
    asyncHandler(async (req, res) => {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            res.status(400).send({ message: 'body param is missing (username, email, password)' });
            return;
        }
        if (await isUsernameExists(username)) {
            res.status(400).send({ message: `username: ${username} already exists` });
            return;
        }

        const user = await createUser({ username, email, password });
        res.status(200).send(user);
    })
);

userRouter.get(
    '/:username',
    asyncHandler(async (req, res) => {
        const { username } = req.params;
        const user = await findUserByUsername(username);
        if (!user) {
            res.status(404).send({ message: `username: ${username} not found` });
            return;
        }
        res.status(200).send(user);
    })
);

userRouter.patch(
    '/:username',
    asyncHandler(async (req, res) => {
        const { username: oldUsername } = req.params;
        const { username, email } = req.body;

        const authUserId = res.locals.user._id;

        if ((await getUserById(authUserId))?.username !== oldUsername) {
            res.status(401).send({ message: 'unauthorized' });
            return;
        }

        if ((!username && !email) || !oldUsername) {
            res.status(400).send({ message: 'body param is missing (oldUsername and username or email)' });
            return;
        }

        const user = await updateUser({ oldUsername, username, email });
        res.status(200).send(user);
    })
);
