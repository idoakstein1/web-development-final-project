import { User, userModel } from '../models/user';

export const createUser = async (user: User) => await userModel.create(user);

export const isUsernameExists = async (username: string) => (await userModel.countDocuments({ username })) > 0;
