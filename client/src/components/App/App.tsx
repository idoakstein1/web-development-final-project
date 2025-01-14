import { Box, Divider } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router';
import { useAuth } from '../../hooks';
import { HomePage, LogInPage, ProfilePage, SignUpPage, WatchLaterPage } from '../../pages';
import { NavBar } from '../NavBar';
import { dividerStyle } from './styles';

/*
TODO:
1. add a link to navigate between sign up and log in pages
2. add error handling for sign up and log in pages + feedback to user
*/

export const App = () => {
    const { user } = useAuth();
    const isAuthenticated = user !== null;

    return (
        <Box sx={{ display: 'flex' }}>
            {isAuthenticated && (
                <>
                    <NavBar />
                    <Divider orientation="vertical" sx={dividerStyle} />
                </>
            )}
            <Routes>
                <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/signUp" />} />
                <Route path="/watchLater" element={<WatchLaterPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/logIn" element={<LogInPage />} />
                <Route path="/signUp" element={<SignUpPage />} />
            </Routes>
        </Box>
    );
};
