import { Box } from '@mui/material';
import { PostList } from '../../components/PostList';

export const HomePage = () => (
    <Box sx={{ display: 'flex', width: '50%' }}>
        <PostList />
    </Box>
);
