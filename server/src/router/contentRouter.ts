import { Router } from 'express';
import { asyncHandler } from '../errors/asyncHandler';
import { searchItems } from '../services';

export const contentRouter = Router();

contentRouter.get(
    '/search/:title',
    asyncHandler(async (req, res) => {
        const { title } = req.params;
        const { type, year } = req.query;

        if (!title) {
            res.status(400).send({
                message: 'param is missing (title)',
            });
            return;
        }
        res.status(200).send(await searchItems({ title, type: type?.toString(), year: year?.toString() }));
    })
);
