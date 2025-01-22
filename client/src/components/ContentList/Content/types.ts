import { Content } from '../../../types';

export type ContentProps = {
    content: Content;
    handleMarkAsWatched: (id: string) => void;
};
