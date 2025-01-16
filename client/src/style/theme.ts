import { createTheme } from '@mui/material';
// @ts-ignore
import '@fontsource/rubik';

export const theme = createTheme({
    typography: {
        fontFamily: 'Rubik',
    },
    palette: {
        background: { default: '#EEEEF1', paper: '#FFFFFF' },
        primary: { main: '#4574DC' },
        info: { main: '#C5C8D6' },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                '*': {
                    '&::-webkit-scrollbar': { width: '7px', height: '10px' },
                    '&::-webkit-scrollbar-thumb': { backgroundColor: '#C5C8D6', borderRadius: '10px' },
                    '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#898C95' },
                },
            },
        },
    },
});
