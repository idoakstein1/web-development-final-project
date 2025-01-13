import { compare } from 'bcrypt';
import { Router } from 'express';
import { findUserByUsername } from '../dal';
import { createTokens, verifyRefreshToken } from '../services';

export const authRouter = Router();

authRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).send({ message: 'body param is missing (username, password)' });
        return;
    }

    const user = await findUserByUsername(username);
    if (!user || !(await compare(password, user.password))) {
        res.status(400).send({ message: 'username or password is incorrect' });
        return;
    }

    const { accessToken, refreshToken } = createTokens({ _id: user._id });

    user.tokens.push(refreshToken);
    await user.save();

    res.status(200).send({ accessToken, refreshToken });
});

authRouter.post('/logout', async (req, res) => {
    try {
        await verifyRefreshToken(req.body.refreshToken);

        res.status(200).send({ message: 'logout successful' });
    } catch (err) {
        res.status(400).send({ message: 'invalid token' });
    }
});

authRouter.post('/refresh', async (req, res) => {
    try {
        const user = await verifyRefreshToken(req.body.refreshToken);
        if (!user) {
            res.status(400).send({ message: 'invalid token' });
            return;
        }

        const { accessToken, refreshToken } = createTokens({ _id: user._id });

        user.tokens.push(refreshToken);
        await user.save();

        res.status(200).send({ accessToken, refreshToken, _id: user._id });
    } catch (error) {
        res.status(400).send({ message: 'invalid token' });
    }
});
