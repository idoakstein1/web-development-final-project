import { Bookmark, BookmarkBorder } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useAPI, useAuth } from '../../hooks';
import { AddToWatchLaterProps } from './types';

export const AddToWatchLater = ({ contentId }: AddToWatchLaterProps) => {
    const API = useAPI();
    const { user } = useAuth();

    const onClick = async () => {
        // await API.watchLater.add(contentId);
    };

    return (
        <IconButton onClick={onClick}>
            {user.watchLater.includes(contentId) ? <Bookmark /> : <BookmarkBorder />}
        </IconButton>
    );
};
