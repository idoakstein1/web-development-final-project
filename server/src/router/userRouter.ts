import { Router } from 'express';
import { isUsernameExists } from '../dal';
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
