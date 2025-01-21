import { Bookmark, BookmarkBorder } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useAPI, useAuth } from '../../hooks';
import { AddToWatchLaterProps } from './types';

export const AddToWatchLater = ({ contentId }: AddToWatchLaterProps) => {
    const API = useAPI();
    const { user } = useAuth();

    const isAddedToWatchLater = user.watchLater.includes(contentId);

    const onClick = async () => {
        // isAddedToWatchLater ? : await API.watchLater.add(contentId);
    };

    return <IconButton onClick={onClick}>{isAddedToWatchLater ? <Bookmark /> : <BookmarkBorder />}</IconButton>;
};
