import { InferSchemaType, Schema, model } from 'mongoose';

const userSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    username: { type: String, required: true },
});

const postSchema = new Schema({
    title: { type: String, required: true },
    user: { type: userSchema, required: true },
    content: { type: String, required: true },
    externalMovieId: { type: String, required: true },
    photoUrl: { type: String, required: true },
    likes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    rate: { type: Number, default: 0, min: 0, max: 5, required: true },
});

export const postModel = model('posts', postSchema);
export type Post = InferSchemaType<typeof postSchema>;
