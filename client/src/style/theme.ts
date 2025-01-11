import { createTheme } from '@mui/material';
// @ts-ignore
import '@fontsource/rubik';

export const theme = createTheme({
    typography: {
        fontFamily: 'Rubik',
    },
    palette: {
        background: { default: '#EEEEF1' },
        primary: { main: '#4574DC' },
    },
});
