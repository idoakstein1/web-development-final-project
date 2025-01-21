import { InferSchemaType, Schema, model } from 'mongoose';

export const contentSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    year: { type: String, required: true },
    type: { type: String, required: true },
    poster: { type: String, required: true },
});

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    tokens: { type: [String], default: [] },
    likes: { type: [String], default: [] },
    watchLater: { type: [contentSchema], default: [] },
});

export const userModel = model('users', userSchema);
export type User = InferSchemaType<typeof userSchema>;
export type ContentSchema = InferSchemaType<typeof contentSchema>;
