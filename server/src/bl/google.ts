import { createUser, findUserByEmail } from '../dal';
import { ApiError } from '../errors/ApiError';
import { createTokens, googleSignin } from '../services';

export const signInOrCreateWithGoogle = async (code: string) => {
    const payload = await googleSignin(code);

    const userGmail = payload?.email;
    if (!userGmail || !payload?.given_name || !payload?.family_name) {
        throw new ApiError({
            status: 500,
            message: 'Invalid response from Google',
        });
    }

    let user = await findUserByEmail(userGmail);
    if (!user) {
        user = await createUser({
            username: payload.given_name + payload.family_name,
            email: userGmail,
            password: 'google-sign-in',
            profilePicture:
                payload.picture ??
                `https://eu.ui-avatars.com/api/?name=${payload.given_name}+${payload.family_name}&size=250`,
        });
    }

    const { accessToken, refreshToken } = createTokens({ _id: user._id });
    user.tokens.push(refreshToken);
    await user.save();

    return {
        accessToken,
        refreshToken,
        user: {
            _id: user._id.toString(),
            username: user.username,
            email: user.email,
            likes: user.likes,
            watchLater: user.watchLater,
            profilePicture: user.profilePicture,
        },
    };
};
