import { zodResolver } from '@hookform/resolvers/zod';
import { AddCircleOutline, Send } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAPI, useAuth } from '../../hooks';
import { Post } from '../../types';
import { FormRatingField, FormTextField } from '../fields';
import { PostFormProps } from './types';

const formSchema = (currentPost?: Pick<Post, '_id' | 'title' | 'content' | 'rate' | 'externalMovieId' | 'photoUrl'>) =>
    z
        .object({
            title: z
                .string()
                .min(2, { message: 'Title must be at least 2 characters long' })
                .max(255, { message: 'Title must be at most 255 characters long' }),
            content: z.string().min(2, { message: 'Content must be at least 2 characters long' }),
            rate: z.number().int().min(0).max(5),
            externalMovieId: z.string(),
        })
        .refine(({ title, content, externalMovieId, rate }) =>
            currentPost
                ? title !== currentPost.title ||
                  content !== currentPost.content ||
                  externalMovieId !== currentPost.externalMovieId ||
                  rate !== currentPost.rate
                : true
        );
type FormSchema = z.infer<ReturnType<typeof formSchema>>;

export const PostForm = ({ post, onSubmit: outerOnSubmit }: PostFormProps) => {
    const API = useAPI();
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const {
        handleSubmit,
        control,
        formState: { isValid },
        reset,
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema(post)),
        mode: 'onChange',
        defaultValues: {
            title: post?.title || '',
            content: post?.content || '',
            rate: post?.rate || 0,
            externalMovieId: post?.externalMovieId || 'tt1285016',
        },
    });

    const onSubmit = async (data: FormSchema) => {
        !post
            ? await API.post.create({
                  ...data,
                  user: { _id: user._id, username: user.username },
                  photoUrl:
                      'https://images-cdn.ubuy.co.in/6352289f38bb253c44612d53-interstellar-movie-poster-24-x-36-inches.jpg',
              })
            : await API.post.update(post._id, data);

        queryClient.invalidateQueries({ queryKey: !post ? ['posts'] : ['userPosts', user._id] });
        reset();
        outerOnSubmit && outerOnSubmit();
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingY: 3, paddingX: 1 }}>
            {!post && <Typography variant="h4">Share your review</Typography>}
            <FormTextField label="Title" name="title" control={control} />
            <FormTextField label="Content" name="content" control={control} multiline rows={4} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography>Rating:</Typography>
                <FormRatingField name="rate" control={control} />
            </Box>
            <IconButton sx={{ alignSelf: 'flex-end' }} onClick={handleSubmit(onSubmit)} disabled={!isValid}>
                {!post ? (
                    <AddCircleOutline color={isValid ? 'primary' : 'disabled'} fontSize="large" />
                ) : (
                    <Send color={isValid ? 'primary' : 'disabled'} fontSize="large" />
                )}
            </IconButton>
        </Box>
    );
};
