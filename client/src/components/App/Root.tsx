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
            <GoogleOAuthProvider clientId="701607865903-euidhkf5c3288tf3afpa6m5oniavtt5o.apps.googleusercontent.com">
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
