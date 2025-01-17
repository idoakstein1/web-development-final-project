import { InferSchemaType, Schema, model } from 'mongoose';

const postSchema = new Schema({
    title: { type: String, required: true },
    user: {
        _id: { type: Schema.Types.ObjectId, ref: 'users', required: true },
        username: { type: String, required: true },
    },
    content: { type: String },
    externalMovieId: { type: String },
    photoUrl: { type: String },
    likes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const postModel = model('posts', postSchema);
export type Post = InferSchemaType<typeof postSchema>;
