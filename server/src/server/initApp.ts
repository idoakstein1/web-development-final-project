import bodyParser from 'body-parser';
import { config } from 'dotenv';
import Express, { NextFunction, Request, Response } from 'express';
import { getConfig, initDBConnection } from '../services';
import { userRouter } from '../router';

config();

export const initApp = async () => {
    await initDBConnection();
    const { port } = getConfig();

    const app = Express();

    app.use(bodyParser.json());
    app.use('/users', userRouter);

    app.use((_err: Error, _req: Request, res: Response, _next: NextFunction) => {
        res.status(500).send({ message: 'Error' });
    });

    const server = app.listen(port, () => {
        console.log(`listening on port ${port}`);
    });

    return { app, server };
};
