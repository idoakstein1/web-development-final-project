import {
    AccountCircle,
    AccountCircleOutlined,
    Home,
    HomeOutlined,
    WatchLater,
    WatchLaterOutlined,
} from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router';
import logo from '../../assets/logo.png';
import { linksContainerStyle, linkStyle, logoContainerStyle, navbarContainerStyle } from './styles';

export const NavBar = () => {
    const { pathname } = useLocation();

    const navigationMap = {
        home: {
            path: '/',
            icon: <HomeOutlined fontSize="large" />,
            activeIcon: <Home fontSize="large" />,
            text: 'Home',
        },
        watchLater: {
            path: '/watchLater',
            icon: <WatchLaterOutlined fontSize="large" />,
            activeIcon: <WatchLater fontSize="large" />,
            text: 'Watch Later',
        },
        profile: {
            path: '/profile',
            icon: <AccountCircleOutlined fontSize="large" />,
            activeIcon: <AccountCircle fontSize="large" />,
            text: 'Profile',
        },
    };

    return (
        <>
            <Box sx={navbarContainerStyle}>
                <Box sx={logoContainerStyle}>
                    <Box component="img" sx={{ width: '100px' }} src={logo} />
                    <Typography variant="h3">WatchIt</Typography>
                </Box>
                <Box sx={linksContainerStyle}>
                    {Object.entries(navigationMap).map(([_key, { path, activeIcon, icon, text }], index) => (
                        <Link to={path} style={linkStyle} key={index}>
                            {pathname === path ? activeIcon : icon}
                            <Typography variant="h5" fontWeight={pathname === path ? 'bold' : 'regular'}>
                                {text}
                            </Typography>
                        </Link>
                    ))}
                </Box>
            </Box>
        </>
    );
};
