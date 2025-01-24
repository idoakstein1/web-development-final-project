import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router';
import { AuthProvider } from '../../contexts';
import { theme } from '../../style';
import { App } from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const queryClient = new QueryClient();

export const Root = () => (
    <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                <AuthProvider>
                    <CssBaseline />
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </AuthProvider>
            </GoogleOAuthProvider>
        </QueryClientProvider>
    </ThemeProvider>
);
