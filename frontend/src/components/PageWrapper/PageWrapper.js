import React, { useState, useEffect } from 'react';
import { Box, styled } from '@mui/material';
import ParallaxBackground from '../ParallaxBackground/ParallaxBackground';

const ContentWrapper = styled(Box)(({ theme, scrolled }) => ({
    position: 'relative',
    minHeight: '100vh',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease-in-out',
    ...(scrolled && {
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
    }),
}));

const PageWrapper = ({ children, page }) => {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const position = window.pageYOffset;
            setScrollPosition(position);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <ParallaxBackground page={page} scrollPosition={scrollPosition} />
            <ContentWrapper scrolled={scrollPosition > 100}>
                {children}
            </ContentWrapper>
        </>
    );
};

export default PageWrapper;
