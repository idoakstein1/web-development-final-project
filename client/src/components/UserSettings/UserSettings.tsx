import { Logout, MoreVert } from '@mui/icons-material';
import { IconButton, List, ListItemButton, Popover, PopoverProps } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../../hooks';
import { UpdateUserForm } from '../UpdateUserForm';

export const UserSettings = () => {
    const { logOut } = useAuth();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [anchorElement, setAnchorElement] = useState<HTMLButtonElement | null>(null);

    const popoverProps: PopoverProps = {
        open: !!anchorElement,
        anchorEl: anchorElement,
        onClose: () => setAnchorElement(null),
        anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
        transformOrigin: { vertical: 'top', horizontal: 'center' },
    };

    return (
        <>
            <IconButton size="large" onClick={(e) => setAnchorElement(e.currentTarget)}>
                <MoreVert fontSize="large" />
            </IconButton>
            <Popover {...popoverProps}>
                <List>
                    <ListItemButton onClick={() => setIsFormOpen(true)}>Edit Profile</ListItemButton>
                    <ListItemButton onClick={logOut} sx={{ gap: '10px' }}>
                        Log Out <Logout />
                    </ListItemButton>
                </List>
            </Popover>
            {isFormOpen && <UpdateUserForm setIsFormOpen={setIsFormOpen} />}
        </>
    );
};
