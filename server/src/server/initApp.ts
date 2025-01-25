import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
import Express, { NextFunction, Request, Response } from 'express';
import { createServer as createHttpsServer } from 'https';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import { authenticate, errorHandler } from '../middlewares';
import {
    authRouter,
    commentRouter,
    contentRouter,
    fileRouter,
    likeRouter,
    postRouter,
    recommendedRouter,
    userRouter,
    watchLaterRouter,
} from '../router';
import { getConfig, initDBConnection } from '../services';

config();

export const initApp = async () => {
    await initDBConnection();
    const { port, env, httpsCert, httpsKey } = getConfig();

    const app = Express();

    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', '*');
        res.header('Access-Control-Allow-Methods', '*');
        next();
    });

    app.use('/auth', authRouter);
    app.use('/public', Express.static('public'));
    app.use('/file', fileRouter);

    if (env === 'development') {
        const options = {
            definition: {
                openapi: '3.0.0',
                info: {
                    title: 'Web Dev 2022 REST API',
                    version: '1.0.0',
                    description: 'REST server including authentication using JWT',
                },
                servers: [{ url: `http://localhost:${port}` }],
            },
            apis: ['./src/docs/*.ts'],
        };
        const specs = swaggerJsDoc(options);
        app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
    }

    app.use(authenticate);
    app.use('/users', userRouter);
    app.use('/posts', postRouter);
    app.use('/likes', likeRouter);
    app.use('/comments', commentRouter);
    app.use('/content', contentRouter);
    app.use('/watch-later', watchLaterRouter);
    app.use('/recommended', recommendedRouter);

    app.use(errorHandler);

    app.use((_err: Error, _req: Request, res: Response, _next: NextFunction) => {
        res.status(500).send({ message: 'Error' });
    });

    const server = (env === 'development' ? app : createHttpsServer({ key: httpsKey, cert: httpsCert }, app)).listen(
        port,
        () => {
            console.log(`listening on port ${port} (${env === 'production' ? 'https' : 'http'})`);
        }
    );

    return { app, server };
};
