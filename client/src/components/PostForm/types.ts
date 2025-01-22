import { Post } from '../../types';

export type PostFormProps = {
    post?: Post;
    onSubmit?: () => void;
};
