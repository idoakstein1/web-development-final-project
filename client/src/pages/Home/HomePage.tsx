import { Box } from '@mui/material';
import { PostList } from '../../components/PostList';
import { PostForm } from '../../components/PostForm';

export const HomePage = () => (
    <>
        <Box sx={{ width: '50%' }}>
            <PostList />
        </Box>
        <Box sx={{ width: '50%' }}>
            <PostForm />
        </Box>
    </>
);
