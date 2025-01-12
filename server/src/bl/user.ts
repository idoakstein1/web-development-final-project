import { createUser as createUserInDB } from '../dal';
import { hashPassword } from '../helperFunctions';
import { User } from '../models';

export const createUser = async ({ password, ...user }: Omit<User, 'tokens'>) => {
    const hashedPassword = await hashPassword(password);
    return await createUserInDB({ ...user, password: hashedPassword });
};
