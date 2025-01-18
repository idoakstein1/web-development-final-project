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
    const { user } = useAuth();

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
                <Rating value={rate} readOnly />
            </CardContent>
            <CardActions sx={{ gap: 1 }}>
                <Box sx={cardActionBoxStyle}>
                    <IconButton>
                        {user.likes.includes(_id) ? <Favorite color="error" /> : <FavoriteBorder />}
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
