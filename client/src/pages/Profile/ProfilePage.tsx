import { Settings } from '@mui/icons-material';
import { Avatar, Box, Button, ButtonProps, Divider, Typography } from '@mui/material';
import { useState } from 'react';
import { UpdateUserForm } from '../../components/UpdateUserForm';
import { useAuth } from '../../hooks';

export const ProfilePage = () => {
    const { user } = useAuth();
    const [isFormOpen, setIsFormOpen] = useState(false);

    const editProfileButtonProps: ButtonProps = {
        sx: { alignSelf: 'center' },
        size: 'large',
        startIcon: <Settings fontSize="large" />,
        variant: 'contained',
        color: 'info',
        onClick: () => setIsFormOpen(true),
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '82%', height: '100vh' }}>
            <Box sx={{ display: 'flex', height: '25vh', justifyContent: 'space-around' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '25%' }}>
                    <Avatar sx={{ height: '175px', width: '175px' }} />
                    <Box>
                        <Typography variant="h3">{user.username}</Typography>
                        <Typography variant="h5" sx={{ color: 'text.secondary' }}>
                            {user.email}
                        </Typography>
                    </Box>
                </Box>
                <Button {...editProfileButtonProps}>Edit Profile</Button>
                {isFormOpen && <UpdateUserForm setIsFormOpen={setIsFormOpen} />}
            </Box>
            <Divider orientation="horizontal" sx={{ borderBottomWidth: 2 }} />
        </Box>
    );
};
