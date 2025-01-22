import { Bookmark, BookmarkBorder } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useAPI, useAuth } from '../../hooks';
import { AddToWatchLaterProps } from './types';

export const AddToWatchLater = ({ content }: AddToWatchLaterProps) => {
    const API = useAPI();
    const { user, setUser } = useAuth();
    const queryClient = useQueryClient();

    const { id: contentId } = content;
    const isAddedToWatchLater = user.watchLater.map(({ id }) => id).includes(contentId);

    const onClick = async () => {
        isAddedToWatchLater
            ? await API.watchLater.update(user.watchLater.filter(({ id }) => id !== contentId).map(({ id }) => id))
            : await API.watchLater.add(contentId);

        queryClient.invalidateQueries({ queryKey: ['watchLater', user._id] });
        setUser({
            ...user,
            watchLater: isAddedToWatchLater
                ? user.watchLater.filter(({ id }) => id !== contentId)
                : [...user.watchLater, content],
        });
    };

    return <IconButton onClick={onClick}>{isAddedToWatchLater ? <Bookmark /> : <BookmarkBorder />}</IconButton>;
};
