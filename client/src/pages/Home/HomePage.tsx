import { Box } from '@mui/material';
import { PostList } from '../../components/PostList';
import { PostForm } from '../../components/PostForm';

export const HomePage = () => (
    <>
        <Box sx={{ display: 'flex', width: '60%' }}>
            <PostList />
        </Box>
        <Box sx={{ width: '40%' }}>
            <PostForm />
        </Box>
    </>
);
