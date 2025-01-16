import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { API } from '../../api';
import { Post as PostType } from '../../types';
import { Post } from '../Post';
import { postListContainerStyle } from './styles';

export const PostList = () => {
    const [posts, setPosts] = useState<PostType[]>([]);

    useEffect(() => {
        (async () => {
            setPosts(await API.post.getPosts());
        })();
    }, []);

    return (
        <Box sx={postListContainerStyle}>
            {posts.map((post) => (
                <Post key={post._id} post={post} />
            ))}
        </Box>
    );
};
