import { createUser as createUserInDB, findUserByUsername, getUserById, updateUser as updateUserInDB } from '../dal';
import { ApiError } from '../errors/ApiError';
import { hashPassword } from '../helperFunctions';
import { User } from '../models';

export const createUser = async ({ password, ...user }: Omit<User, 'tokens' | 'likes' | 'watchLater'>) => {
    const hashedPassword = await hashPassword(password);
    return await createUserInDB({ ...user, password: hashedPassword });
};

export const updateUser = async ({
    oldUsername,
    username,
    email,
}: {
    oldUsername: User['username'];
    username: User['username'];
    email: User['email'];
}) => {
    if (oldUsername !== username && (await findUserByUsername(username))) {
        throw new ApiError({ status: 400, message: `username: ${username} already exists` });
    }

    return await updateUserInDB({ oldUsername, username, email });
};
