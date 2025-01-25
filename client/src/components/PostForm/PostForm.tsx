import { zodResolver } from '@hookform/resolvers/zod';
import { AddCircleOutline, CheckBox, Send } from '@mui/icons-material';
import { Box, IconButton, SvgIconProps, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAPI, useAuth } from '../../hooks';
import { Content, Post } from '../../types';
import { ContentSearch } from '../ContentSearch';
import { FormRatingField, FormTextField, PhotoUpload } from '../fields';
import { PostFormProps } from './types';

const formSchema = (currentPost?: Post) =>
    z
        .object({
            title: z
                .string()
                .min(2, { message: 'Title must be at least 2 characters long' })
                .max(255, { message: 'Title must be at most 255 characters long' }),
            content: z.string().min(2, { message: 'Content must be at least 2 characters long' }),
            rate: z.number().int().min(1).max(5),
            externalMovie: z.object({
                id: z.string(),
                name: z.string(),
                year: z.string(),
                type: z.string(),
                poster: z.string(),
            }),
            photo: z
                .instanceof(File, { message: 'Please upload a valid file' })
                .refine(({ type }) => ['image/jpeg', 'image/png'].includes(type), {
                    message: 'Only JPEG or PNG files are allowed',
                })
                .optional(),
        })
        .refine(({ title, content, rate }) =>
            currentPost
                ? title !== currentPost.title || content !== currentPost.content || rate !== currentPost.rate
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
        setValue,
        reset,
        watch,
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema(post)),
        mode: 'onChange',
        defaultValues: {
            title: post?.title || '',
            content: post?.content || '',
            rate: post?.rate || 0,
            externalMovie: post?.externalMovie || {},
        },
    });
    const { externalMovie } = watch();

    const onSubmit = async ({ externalMovie, ...data }: FormSchema) => {
        !post
            ? await API.post.create({
                  ...data,
                  user: { _id: user._id, username: user.username, profilePicture: user.profilePicture },
                  externalMovie,
              })
            : await API.post.update(post._id, data);

        queryClient.invalidateQueries({ queryKey: !post ? ['posts'] : ['userPosts', user._id] });
        reset();
        outerOnSubmit && outerOnSubmit();
    };

    const iconProps: SvgIconProps = { fontSize: 'large', color: isValid ? 'primary' : 'disabled' };

    const SetContentButton = (content: Content) => (
        <IconButton color="primary" onClick={() => setValue('externalMovie', content)}>
            <CheckBox />
        </IconButton>
    );

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 3 }}>
            {!post && (
                <>
                    <Typography variant="h4">Share your review</Typography>
                    <ContentSearch isField listAction={SetContentButton} />
                    {externalMovie.name && <Typography variant="h6">Selected content: {externalMovie.name}</Typography>}
                </>
            )}
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '40%' }}>
                    <FormTextField label="Title" name="title" control={control} />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography>Rating:</Typography>
                        <FormRatingField name="rate" control={control} />
                    </Box>
                </Box>
                <FormTextField
                    label="Content"
                    name="content"
                    control={control}
                    multiline
                    rows={3}
                    sx={{ width: '40%' }}
                />
            </Box>
            <PhotoUpload name="photo" control={control} preview="image" />
            <IconButton sx={{ alignSelf: 'flex-end' }} onClick={handleSubmit(onSubmit)} disabled={!isValid}>
                {!post ? <AddCircleOutline {...iconProps} /> : <Send {...iconProps} />}
            </IconButton>
        </Box>
    );
};
