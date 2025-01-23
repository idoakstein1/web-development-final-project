import { zodResolver } from '@hookform/resolvers/zod';
import { AddComment } from '@mui/icons-material';
import {
    Avatar,
    Box,
    Dialog,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListItemTextProps,
    Typography,
} from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAPI, useAuth } from '../../hooks';
import { FormTextField } from '../fields';
import { Loader } from '../Loader';
import { CommentListProps } from './types';

const formSchema = z.object({
    content: z
        .string()
        .min(2, { message: 'Content must be at least 2 characters long' })
        .max(255, { message: 'Content must be at most 255 characters long' }),
});
type FormSchema = z.infer<typeof formSchema>;

export const CommentList = ({ postId, onClose, showAddComment }: CommentListProps) => {
    const API = useAPI();
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const { data, isLoading } = useQuery({
        queryKey: ['postComments', postId],
        queryFn: () => API.comment.getByPost(postId),
    });
    const {
        handleSubmit,
        control,
        formState: { isValid },
        reset,
    } = useForm<FormSchema>({ resolver: zodResolver(formSchema), mode: 'onChange', defaultValues: { content: '' } });

    if (isLoading || !data) {
        return <Loader />;
    }

    const onSubmit = async ({ content }: FormSchema) => {
        await API.comment.create({
            postId,
            content,
            user: { _id: user._id, username: user.username, profilePicture: user.profilePicture },
        });
        queryClient.invalidateQueries({ queryKey: ['postComments', postId] });
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        reset();
    };

    const listItemTextProps: ListItemTextProps = {
        slotProps: { primary: { variant: 'body2' }, secondary: { variant: 'body1' } },
    };

    return (
        <Dialog open={true} onClose={onClose} fullWidth>
            {showAddComment && (
                <Box sx={{ paddingTop: 3, paddingX: 2, display: 'flex', alignItems: 'center', gap: 3 }}>
                    <FormTextField
                        control={control}
                        name="content"
                        placeholder="Add a comment..."
                        sx={{ width: '100%' }}
                    />
                    <IconButton disabled={!isValid} onClick={handleSubmit(onSubmit)}>
                        <AddComment color={isValid ? 'primary' : 'disabled'} />
                    </IconButton>
                </Box>
            )}
            {data.comments.length > 0 ? (
                <List>
                    {data.comments.map(({ _id, content, user: { username, profilePicture } }) => (
                        <ListItem key={_id}>
                            <ListItemAvatar>
                                <Avatar src={profilePicture} />
                            </ListItemAvatar>
                            <ListItemText primary={username} secondary={content} {...listItemTextProps} />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography variant="h6" align="center">
                    No comments yet
                </Typography>
            )}
        </Dialog>
    );
};
