import { InferSchemaType, Schema } from 'mongoose';

export const userSubSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    username: { type: String, required: true },
    profilePicture: { type: String, required: true },
});

export const contentSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    year: { type: String, required: true },
    type: { type: String, required: true },
    poster: { type: String, required: true },
});
export type Content = InferSchemaType<typeof contentSchema>;
