import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router';
import { AuthProvider } from '../../contexts';
import { theme } from '../../style';
import { App } from './App';

const queryClient = new QueryClient();

export const Root = () => (
    <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <CssBaseline />
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </AuthProvider>
        </QueryClientProvider>
    </ThemeProvider>
);
