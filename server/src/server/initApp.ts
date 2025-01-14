import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
import Express, { NextFunction, Request, Response } from 'express';
import { authenticate, errorHandler } from '../middlewares';
import { authRouter, userRouter } from '../router';
import { getConfig, initDBConnection } from '../services';

config();

export const initApp = async () => {
    await initDBConnection();
    const { port } = getConfig();

    const app = Express();

    app.use(cors());
    app.use(bodyParser.json());
    app.use('/auth', authRouter);

    app.use(authenticate);
    app.use('/users', userRouter);

    app.use(errorHandler);

    app.use((_err: Error, _req: Request, res: Response, _next: NextFunction) => {
        res.status(500).send({ message: 'Error' });
    });

    const server = app.listen(port, () => {
        console.log(`listening on port ${port}`);
    });

    return { app, server };
};
