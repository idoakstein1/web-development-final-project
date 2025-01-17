import { Box, CircularProgress } from '@mui/material';

export const Loader = () => (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', paddingY: 2 }}>
        <CircularProgress />
    </Box>
);
