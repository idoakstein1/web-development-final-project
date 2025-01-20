import { ProjectionFields } from 'mongoose';
import { User, userModel } from '../models/user';

export const createUser = async (user: Omit<User, 'tokens' | 'likes' | 'watchLater'>) => await userModel.create(user);

export const isUsernameExists = async (username: string) => (await userModel.countDocuments({ username })) > 0;

export const getUserById = async (id: string) => userModel.findById({ _id: id });

export const findUserByUsername = async (
    username: string,
    projection: ProjectionFields<User> = { password: 0, tokens: 0 }
) => userModel.findOne({ username }, projection);

export const updateUser = async ({
    oldUsername,
    username,
    email,
}: {
    oldUsername: User['username'];
    username: User['username'];
    email: User['email'];
}) => userModel.findOneAndUpdate({ username: oldUsername }, { username, email }, { new: true });

export const getUserLikesById = async (id: string) => userModel.findById({ _id: id }, { likes: 1 });

export const overwriteWatchLater = async (userId: string, watchLater: string[]) =>
    userModel.updateOne({ _id: userId }, { watchLater });

export const getWatchLater = async (userId: string) => userModel.findById({ _id: userId }, { watchLater: 1 });
