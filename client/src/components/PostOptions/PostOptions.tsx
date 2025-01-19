import { Delete, MoreVert } from '@mui/icons-material';
import { IconButton, List, ListItemButton, Popover, PopoverProps } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useAPI } from '../../hooks';
import { PostOptionsProps } from './types';

export const PostOptions = ({ postId, onDelete }: PostOptionsProps) => {
    const API = useAPI();
    const queryClient = useQueryClient();
    const [anchorElement, setAnchorElement] = useState<HTMLButtonElement | null>(null);

    const popoverProps: PopoverProps = {
        open: !!anchorElement,
        anchorEl: anchorElement,
        onClose: () => setAnchorElement(null),
        anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
        transformOrigin: { vertical: 'top', horizontal: 'center' },
    };

    const deletePost = async () => {
        await API.post.delete(postId);
        await queryClient.invalidateQueries({ queryKey: ['userPosts'] });
        onDelete();
    };

    return (
        <>
            <IconButton sx={{ marginTop: 1 }} onClick={(e) => setAnchorElement(e.currentTarget)}>
                <MoreVert />
            </IconButton>
            <Popover {...popoverProps}>
                <List>
                    <ListItemButton>Edit Post</ListItemButton>
                    <ListItemButton onClick={deletePost} sx={{ gap: '10px', color: 'red' }}>
                        <Delete /> Delete Post
                    </ListItemButton>
                </List>
            </Popover>
        </>
    );
};
