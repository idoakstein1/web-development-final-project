import { Box, Dialog, ImageList, ImageListItem, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useAPI, useAuth } from '../../hooks';
import { Loader } from '../Loader';
import { Post } from '../Post';
import { PostForm } from '../PostForm';

export const UserPosts = () => {
    const API = useAPI();
    const { user } = useAuth();
    const { data, isLoading } = useQuery({
        queryKey: ['userPosts', user._id],
        queryFn: () => API.post.getUserPosts(user._id),
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
    const [isInEditMode, setIsInEditMode] = useState(false);

    if (isLoading || !data) {
        return <Loader />;
    }

    const handlePostClick = (postId: string) => () => {
        setIsDialogOpen(true);
        setSelectedPostId(postId);
    };
    const onDialogClose = () => {
        setIsDialogOpen(false);
        setSelectedPostId(null);
    };
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
                        <ImageListItem key={_id} onClick={handlePostClick(_id)}>
                            <Box component="img" width="25vw" src={`${photoUrl}?fit=crop&auto=format`} />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>
            <Dialog open={isDialogOpen} onClose={onDialogClose} fullWidth>
                {selectedPost &&
                    (isInEditMode ? (
                        <PostForm
                            post={selectedPost}
                            onSubmit={() => {
                                setIsInEditMode(false);
                                onDialogClose();
                            }}
                        />
                    ) : (
                        <Post
                            post={selectedPost}
                            showSettings
                            onDelete={onDialogClose}
                            onEdit={() => setIsInEditMode(true)}
                        />
                    ))}
            </Dialog>
        </>
    );
};
