import { Box, Dialog, ImageList, ImageListItem, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { API } from '../../api';
import { useAuth } from '../../hooks';
import { Loader } from '../Loader';
import { Post } from '../Post';

export const UserPosts = () => {
    const { user, accessToken } = useAuth();
    const { data, isLoading } = useQuery({
        queryKey: ['userPosts'],
        queryFn: () => API.post.getUserPosts(user._id, accessToken),
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

    if (isLoading || !data) {
        return <Loader />;
    }

    const selectedPost = data.posts.find(({ _id }) => _id === selectedPostId);

    return data.posts.length === 0 ? (
        <Typography align="center" color="textSecondary" paddingY={2}>
            It's pretty quiet here...
        </Typography>
    ) : (
        <>
            <Box sx={{ paddingRight: 2, height: '75vh', overflowY: 'auto' }}>
                <ImageList variant="masonry" cols={3}>
                    {data.posts.map(({ _id, photoUrl }) => (
                        <ImageListItem
                            key={_id}
                            onClick={() => {
                                setIsDialogOpen(true);
                                setSelectedPostId(_id);
                            }}
                        >
                            <Box component="img" width="25vw" src={`${photoUrl}?fit=crop&auto=format`} />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>
            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} fullWidth>
                {selectedPost && <Post post={selectedPost} showSettings />}
            </Dialog>
        </>
    );
};
