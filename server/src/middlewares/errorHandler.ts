import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../errors/ApiError';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof ApiError) {
        res.status(err.status).send({ message: err.message });
    } else {
        res.status(500).send({ message: 'Internal Server Error' });
    }
};
