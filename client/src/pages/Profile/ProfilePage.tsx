import { Avatar, Box, Divider, Typography } from '@mui/material';
import { UserSettings } from '../../components/UserSettings';
import { useAuth } from '../../hooks';

export const ProfilePage = () => {
    const { user } = useAuth();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '82%', height: '100vh' }}>
            <Box sx={{ display: 'flex', height: '25vh', justifyContent: 'space-around', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '25%' }}>
                    <Avatar sx={{ height: '175px', width: '175px' }} />
                    <Box>
                        <Typography variant="h3">{user.username}</Typography>
                        <Typography variant="h5" sx={{ color: 'text.secondary' }}>
                            {user.email}
                        </Typography>
                    </Box>
                </Box>
                <UserSettings />
            </Box>
            <Divider orientation="horizontal" sx={{ borderBottomWidth: 2 }} />
        </Box>
    );
};
