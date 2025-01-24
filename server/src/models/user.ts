import { InferSchemaType, Schema, model } from 'mongoose';
import { commentModel } from './comment';
import { contentSchema } from './general';
import { postModel } from './post';

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    tokens: { type: [String], default: [] },
    likes: { type: [String], default: [] },
    watchLater: { type: [contentSchema], default: [] },
    profilePicture: { type: String, required: true },
});

userSchema.post('findOneAndUpdate', async (user) => {
    if (!user) {
        return;
    }

    const { _id, username, profilePicture } = user;

    await postModel.updateMany(
        { 'user._id': _id },
        { 'user.username': username, 'user.profilePicture': profilePicture }
    );
    await commentModel.updateMany(
        { 'user._id': _id },
        { 'user.username': username, 'user.profilePicture': profilePicture }
    );
});

export const userModel = model('users', userSchema);
export type User = InferSchemaType<typeof userSchema>;
