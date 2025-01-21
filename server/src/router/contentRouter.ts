import { Router } from 'express';
import { asyncHandler } from '../errors/asyncHandler';
import { searchItems } from '../services';

export const contentRouter = Router();

contentRouter.get(
    '/search',
    asyncHandler(async (req, res) => {
        const { type, year, title } = req.query as Record<string, string | undefined>;

        if (!title) {
            res.status(400).send({ message: 'query param is missing (title)' });
            return;
        }
        res.status(200).send(await searchItems({ title, type: type?.toString(), year: year?.toString() }));
    })
);
