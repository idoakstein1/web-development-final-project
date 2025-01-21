import { ChatBubbleOutline, Favorite, FavoriteBorder } from '@mui/icons-material';
import {
    Avatar,
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardHeaderProps,
    CardMedia,
    Divider,
    IconButton,
    Rating,
    Typography,
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useAuth } from '../../hooks';
import { useAPI } from '../../hooks/useAPI';
import { AddToWatchLater } from '../AddToWatchLater';
import { CommentList, CommentListProps } from '../CommentList';
import { PostOptions } from '../PostOptions';
import { cardActionBoxStyle } from './styles';
import { PostProps } from './types';

export const Post = ({
    post: {
        _id,
        title,
        content,
        user: { username },
        likes,
        commentsCount,
        rate,
        photoUrl,
        externalMovie,
    },
    showSettings,
    onDelete = () => {},
    onEdit = () => {},
}: PostProps) => {
    const API = useAPI();
    const { user, setUser } = useAuth();
    const queryClient = useQueryClient();
    const [isCommentOpen, setIsCommentOpen] = useState(false);

    const isUserPosts = showSettings;

    const hasUserLiked = user.likes.includes(_id);
    const handleLikeClick = async () => {
        await API.post[hasUserLiked ? 'dislike' : 'like'](_id);
        setUser({ ...user, likes: hasUserLiked ? user.likes.filter((id) => id !== _id) : [...user.likes, _id] });
        queryClient.invalidateQueries({ queryKey: isUserPosts ? ['userPosts', user._id] : ['posts'] });
    };

    const cardHeaderProps: CardHeaderProps = {
        avatar: <Avatar sx={{ height: '50px', width: '50px' }} />,
        title: username,
        titleTypographyProps: { variant: 'h4' },
        action: showSettings ? <PostOptions postId={_id} onDelete={onDelete} onEdit={onEdit} /> : undefined,
    };
    const commentListProps: CommentListProps = {
        postId: _id,
        onClose: () => setIsCommentOpen(false),
        showAddComment: !isUserPosts,
    };

    return (
        <Card sx={{ width: isUserPosts ? '100%' : '30vw', minHeight: 'fit-content', boxShadow: 3 }}>
            <CardHeader {...cardHeaderProps} />
            <Divider />
            <CardMedia component="img" sx={{ objectFit: 'cover' }} image={photoUrl} />
            <Divider />
            <CardContent>
                <Typography variant="h5">{title}</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{content}</Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', paddingTop: 2 }}>
                    <Typography variant="h6">Rating:</Typography>
                    <Rating value={rate} readOnly />
                </Box>
            </CardContent>
            <CardActions sx={{ gap: 1 }}>
                <Box sx={cardActionBoxStyle}>
                    <IconButton onClick={handleLikeClick}>
                        {hasUserLiked ? <Favorite color="error" /> : <FavoriteBorder />}
                    </IconButton>
                    <Typography>{likes}</Typography>
                </Box>
                <Box sx={cardActionBoxStyle}>
                    <IconButton onClick={() => setIsCommentOpen(true)}>
                        <ChatBubbleOutline />
                    </IconButton>
                    {isCommentOpen && <CommentList {...commentListProps} />}
                    <Typography>{commentsCount}</Typography>
                </Box>
                <AddToWatchLater content={externalMovie} />
            </CardActions>
        </Card>
    );
};
