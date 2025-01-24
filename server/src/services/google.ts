import { OAuth2Client, VerifyIdTokenOptions } from 'google-auth-library';
import { ApiError } from '../errors/ApiError';
import { getConfig } from './config';

const client = new OAuth2Client();

export const googleSignin = async (credential: VerifyIdTokenOptions['idToken']) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: getConfig().googleClientId,
        });

        return ticket.getPayload();
    } catch (err) {
        throw new ApiError({
            status: 400,
            message: 'Invalid token',
        });
    }
};
