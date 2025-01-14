import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router';
import { AuthProvider } from '../../contexts';
import { theme } from '../../style';
import { App } from './App';

export const Root = () => (
    <ThemeProvider theme={theme}>
        <AuthProvider>
            <CssBaseline />
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AuthProvider>
    </ThemeProvider>
);
