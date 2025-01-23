export type Comment = {
    _id: string;
    postId: string;
    user: { _id: string; username: string; profilePicture: string };
    content: string;
    createdAt: Date;
};
