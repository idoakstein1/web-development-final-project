import { InferSchemaType, Schema, model } from 'mongoose';
import { userSubSchema } from './general';

const commentSchema = new Schema({
    postId: { type: Schema.Types.ObjectId, ref: 'posts', required: true },
    user: { type: userSubSchema, required: true },
    content: { type: String },
    createdAt: { type: Date, default: Date.now },
});

export const commentModel = model('comments', commentSchema);
export type Comment = InferSchemaType<typeof commentSchema>;
