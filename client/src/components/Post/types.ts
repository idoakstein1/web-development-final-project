import { Post } from '../../types';

export type PostProps = {
    post: Post;
    showSettings?: boolean;
    onDelete?: () => void;
};
