import { Box, CssBaseline, Divider, ThemeProvider } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { HomePage, LogInPage, ProfilePage, SignUpPage, WatchLaterPage } from '../../pages';
import { theme } from '../../style';
import { NavBar } from '../NavBar';

export const App = () => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
            <Box sx={{ display: 'flex' }}>
                <NavBar />
                <Divider orientation="vertical" sx={{ color: 'black', height: '100vh', width: '1px', marginX: '1%' }} />
                <Routes>
                    {/* <Route path="/" element={<HomePage />} /> */}
                    <Route path="/" element={<Navigate to="/signUp" />} />
                    <Route path="/watchLater" element={<WatchLaterPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/logIn" element={<LogInPage />} />
                    <Route path="/signUp" element={<SignUpPage />} />
                </Routes>
            </Box>
        </BrowserRouter>
    </ThemeProvider>
);
