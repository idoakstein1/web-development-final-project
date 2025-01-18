import { zodResolver } from '@hookform/resolvers/zod';
import { AddCircleOutline } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { API } from '../../api';
import { useAuth } from '../../hooks';
import { FormRatingField, FormTextField } from '../fields';

const formSchema = z.object({
    title: z
        .string()
        .min(2, { message: 'Title must be at least 2 characters long' })
        .max(255, { message: 'Title must be at most 255 characters long' }),
    content: z.string().min(2, { message: 'Content must be at least 2 characters long' }),
    rate: z.number().int().min(0).max(5),
    externalMovieId: z.string(),
});
type FormSchema = z.infer<typeof formSchema>;

export const PostForm = () => {
    const { user, accessToken } = useAuth();
    const queryClient = useQueryClient();
    const {
        handleSubmit,
        control,
        formState: { isValid },
        reset,
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: { title: '', content: '', rate: 0, externalMovieId: 'a' },
    });

    const onSubmit = async (data: FormSchema) => {
        const { _id, username } = user;

        await API.post.create(
            {
                ...data,
                user: { _id, username },
                photoUrl:
                    'https://images-cdn.ubuy.co.in/6352289f38bb253c44612d53-interstellar-movie-poster-24-x-36-inches.jpg',
            },
            accessToken
        );
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        reset();
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingY: 3 }}>
            <Typography variant="h4">Share your review</Typography>
            <FormTextField label="Title" name="title" control={control} />
            <FormTextField label="Content" name="content" control={control} multiline rows={4} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography>Rating:</Typography>
                <FormRatingField name="rate" control={control} />
            </Box>
            <IconButton sx={{ alignSelf: 'flex-end' }} onClick={handleSubmit(onSubmit)} disabled={!isValid}>
                <AddCircleOutline color={isValid ? 'primary' : 'disabled'} fontSize="large" />
            </IconButton>
        </Box>
    );
};
