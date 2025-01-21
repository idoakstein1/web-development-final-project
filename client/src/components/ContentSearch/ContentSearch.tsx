import { zodResolver } from '@hookform/resolvers/zod';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useDebounceValue } from 'usehooks-ts';
import { z } from 'zod';
import { useAPI } from '../../hooks';
import { ValueSet } from '../../types';
import { AddToWatchLater } from '../AddToWatchLater';
import { FormAutoComplete, FormTextField } from '../fields';
import { Loader } from '../Loader';

const types: ValueSet[] = [
    { id: 'movie', name: 'Movie' },
    { id: 'series', name: 'Series' },
];

const formSchema = z.object({
    title: z.string().nonempty(),
    type: z.union([
        z.object({ id: z.literal('movie'), name: z.literal('Movie') }),
        z.object({ id: z.literal('series'), name: z.literal('Series') }),
    ]),
});
type FormSchema = z.infer<typeof formSchema>;

export const ContentSearch = () => {
    const API = useAPI();
    const {
        control,
        formState: { isValid },
        watch,
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: { title: '', type: { id: 'movie', name: 'Movie' } },
    });
    const { type } = watch();
    const [debouncedTitle, setDebouncedTitle] = useDebounceValue('', 500);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['content', { type, title: debouncedTitle }],
        queryFn: () => API.content.search(debouncedTitle, type.id),
        enabled: isValid && !!debouncedTitle,
        retry: false,
    });

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '50%', paddingY: 5 }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
                <FormAutoComplete control={control} name="type" options={types} label="Type" sx={{ width: '20%' }} />
                <FormTextField
                    control={control}
                    name="title"
                    onChange={setDebouncedTitle}
                    placeholder="Enter title..."
                    sx={{ width: '60%' }}
                />
            </Box>
            {isValid && !!debouncedTitle && isLoading ? (
                <Loader />
            ) : isError ? (
                <Typography>{isAxiosError(error) ? error.response?.data.message : 'Something went wrong'}</Typography>
            ) : (
                <List sx={{ height: '85vh', overflow: 'auto' }}>
                    {(data?.items || []).map((content) => (
                        <ListItem
                            key={content.id}
                            sx={{ gap: 3 }}
                            secondaryAction={<AddToWatchLater content={content} />}
                        >
                            <ListItemAvatar>
                                <Avatar sx={{ width: '75px', height: '75px' }} src={content.poster} />
                            </ListItemAvatar>
                            <ListItemText primary={content.name} secondary={content.year} />
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
};
