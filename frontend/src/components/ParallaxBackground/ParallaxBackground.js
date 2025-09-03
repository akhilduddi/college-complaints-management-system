import React from 'react';
import { Box, styled } from '@mui/material';

const backgrounds = {
    default: {
        primary: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
        secondary: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    },
    home: {
        primary: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
        secondary: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    },
    login: {
        primary: 'https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
        secondary: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    },
    courses: {
        primary: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
        secondary: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    },
    branch: {
        primary: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
        secondary: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    },
};

const BackgroundWrapper = styled(Box)(({ theme }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    '&::before, &::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        transition: 'opacity 0.5s ease-in-out',
    },
    '&::before': {
        opacity: ({ opacity }) => 0.5 - (opacity * 0.3),
    },
    '&::after': {
        opacity: ({ opacity }) => opacity * 0.5,
    },
}));

const ParallaxBackground = ({ page = 'default', scrollPosition = 0 }) => {
    const opacity = Math.min(scrollPosition / 1000, 0.5);
    const bgImages = backgrounds[page] || backgrounds.default;

    return (
        <BackgroundWrapper
            className="parallax-background"
            opacity={opacity}
            sx={{
                '&::before': {
                    backgroundImage: `url("${bgImages.primary}")`,
                },
                '&::after': {
                    backgroundImage: `url("${bgImages.secondary}")`,
                },
            }}
        />
    );
};

export default ParallaxBackground;
