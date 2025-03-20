import { Box, Divider } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router';
import { useAuth } from '../../hooks';
import { HomePage, LogInPage, ProfilePage, RecommendationsPage, SignUpPage, WatchLaterPage } from '../../pages';
import { NavBar } from '../NavBar';
import { ReactNode } from 'react';

const ProtectedRoute = ({ component }: { component: ReactNode }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? component : <Navigate to="/logIn" />;
};

export const App = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Box sx={{ display: 'flex' }}>
            {isAuthenticated && (
                <>
                    <NavBar />
                    <Divider orientation="vertical" sx={{ height: '100vh', marginX: '3%', borderRightWidth: 2 }} />
                </>
            )}
            <Routes>
                <Route path="/" element={<ProtectedRoute component={<HomePage />} />} />
                <Route path="/watchLater" element={<ProtectedRoute component={<WatchLaterPage />} />} />
                <Route path="/profile" element={<ProtectedRoute component={<ProfilePage />} />} />
                <Route path="/recommendations" element={<ProtectedRoute component={<RecommendationsPage />} />} />
                <Route path="/logIn" element={<LogInPage />} />
                <Route path="/signUp" element={<SignUpPage />} />
            </Routes>
        </Box>
    );
};
