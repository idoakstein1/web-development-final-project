import { InferSchemaType, Schema, model } from 'mongoose';
import { contentSchema, userSubSchema } from './general';

const postSchema = new Schema({
    title: { type: String, required: true },
    user: { type: userSubSchema, required: true },
    content: { type: String, required: true },
    externalMovie: { type: contentSchema, required: true },
    photoUrl: { type: String, required: true },
    likes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    rate: { type: Number, default: 0, min: 0, max: 5, required: true },
    commentsCount: { type: Number, default: 0 },
});

export const postModel = model('posts', postSchema);
export type Post = InferSchemaType<typeof postSchema>;
