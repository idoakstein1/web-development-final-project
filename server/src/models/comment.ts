import { InferSchemaType, Schema, model } from 'mongoose';
import { userSchema } from './post';

const commentSchema = new Schema({
    postId: { type: Schema.Types.ObjectId, ref: 'posts', required: true },
    user: { type: userSchema, required: true },
    content: { type: String },
});

export const commentModel = model('comments', commentSchema);
export type Comment = InferSchemaType<typeof commentSchema>;
