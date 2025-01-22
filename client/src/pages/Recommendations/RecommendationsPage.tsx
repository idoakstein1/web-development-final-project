import { InfoOutlined } from '@mui/icons-material';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Tooltip, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { AddToWatchLater } from '../../components/AddToWatchLater';
import { Loader } from '../../components/Loader';
import { useAPI } from '../../hooks';
import { Content } from '../../types';

export const RecommendationsPage = () => {
    const API = useAPI();
    const { data, isLoading } = useQuery({ queryKey: ['recommendations'], queryFn: () => API.recommendation.get() });

    if (isLoading || !data) {
        return <Loader />;
    }

    return (
        <Box sx={{ width: '100%', padding: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 3 }}>
                <Typography variant="h3">Recommendations</Typography>
                <Tooltip title="Recommendations are based on your ratings and are tuned by ChatGPT AI">
                    <InfoOutlined fontSize="large" />
                </Tooltip>
            </Box>
            {data.movies.length > 0 || data.series.length > 0 ? (
                <Box sx={{ display: 'flex', gap: 5 }}>
                    {Object.entries(data).map(([type, contentList]: [string, Content[]]) => (
                        <Box sx={{ width: '50%' }} key={type}>
                            <Typography variant="h5">{type}</Typography>
                            <List sx={{ maxHeight: '85vh', overflow: 'auto' }}>
                                {contentList.map((content) => (
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
                        </Box>
                    ))}
                </Box>
            ) : (
                <>
                    <Typography variant="h5">No recommendations for you :(</Typography>
                    <Typography variant="h5">Try being more active</Typography>
                </>
            )}
        </Box>
    );
};
