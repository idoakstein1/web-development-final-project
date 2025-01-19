import { Post } from '../../types';

export type PostFormProps = {
    post?: Pick<Post, '_id' | 'title' | 'content' | 'rate' | 'externalMovieId' | 'photoUrl'>;
    onSubmit?: () => void;
};
