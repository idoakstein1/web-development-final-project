import { Box, CssBaseline, Divider, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router';
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
                    <Route path="/" element={<h1>Home</h1>} />
                    <Route path="/watchLater" element={<h1>Watch Later</h1>} />
                    <Route path="/profile" element={<h1>Profile</h1>} />
                </Routes>
            </Box>
        </BrowserRouter>
    </ThemeProvider>
);
