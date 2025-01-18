import { ChatBubbleOutline, Favorite, FavoriteBorder, MoreVert } from '@mui/icons-material';
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
import { API } from '../../api';
import { useAuth } from '../../hooks';
import { cardActionBoxStyle } from './styles';
import { PostProps } from './types';

export const Post = ({
    post: {
        _id,
        title,
        content,
        user: { username },
        likes,
        commentsNumber,
        rate,
        photoUrl,
    },
    showSettings,
}: PostProps) => {
    const { user, setUser, accessToken } = useAuth();
    const queryClient = useQueryClient();

    const hasUserLiked = user.likes.includes(_id);
    const handleLikeClick = async () => {
        await API.post[hasUserLiked ? 'dislike' : 'like'](_id, accessToken);
        setUser({ ...user, likes: hasUserLiked ? user.likes.filter((id) => id !== _id) : [...user.likes, _id] });
        await queryClient.invalidateQueries({ queryKey: [showSettings ? 'userPosts' : 'posts'] });
    };

    const cardHeaderProps: CardHeaderProps = {
        avatar: <Avatar sx={{ height: '50px', width: '50px' }} />,
        title: username,
        titleTypographyProps: { variant: 'h4' },
        action: showSettings ? (
            <IconButton sx={{ marginTop: 1 }}>
                <MoreVert />
            </IconButton>
        ) : undefined,
    };

    return (
        <Card sx={{ width: showSettings ? '100%' : '30vw', minHeight: 'fit-content', boxShadow: 3 }}>
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
                    <IconButton>
                        <ChatBubbleOutline />
                    </IconButton>
                    <Typography>{commentsNumber}</Typography>
                </Box>
            </CardActions>
        </Card>
    );
};
