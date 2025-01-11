import { SxProps } from '@mui/material';
import { CSSProperties } from 'react';

export const navbarContainerStyle: SxProps = {
    height: '100vh',
    width: '15%',
    display: 'flex',
    flexDirection: 'column',
    gap: '5vh',
};

export const logoContainerStyle: SxProps = {
    display: 'flex',
    alignItems: 'center',
};

export const linksContainerStyle: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '10%',
    gap: '2vh',
};

export const linkStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none',
    color: 'inherit',
};
