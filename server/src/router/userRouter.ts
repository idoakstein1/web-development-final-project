import { Router } from 'express';
import { isUsernameExists, findUserByUsername } from '../dal';
import { createUser } from '../bl';

export const userRouter = Router();

userRouter.post('/', async (req, res) => {
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
});

userRouter.get('/:username', async (req, res) => {
    const { username } = req.params;
    const user = await findUserByUsername(username);
    if (!user) {
        res.status(404).send({ message: `username: ${username} not found` });
        return;
    }
    res.status(200).send(user);
});
