import { Router } from 'express';
import { asyncHandler } from '../errors/asyncHandler';
import { getRecommended } from '../bl/chatGPT';

export const recommendedRouter = Router();

recommendedRouter.get(
    '/',
    asyncHandler(async (req, res) => {
        const userId = res.locals.user._id;

        const recommendedData = await getRecommended(userId);

        res.status(200).send(recommendedData);
    })
);
