import React from 'react';
import { Box, Typography, CircularProgress, styled } from '@mui/material';

const LoadingContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
    gap: theme.spacing(3),
    position: 'relative',
    zIndex: 1,
}));

const LoadingBox = styled(Box)(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    background: 'rgba(255, 255, 255, 0.9)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    animation: 'float 3s ease-in-out infinite',
    '@keyframes float': {
        '0%': {
            transform: 'translateY(0px)',
        },
        '50%': {
            transform: 'translateY(-10px)',
        },
        '100%': {
            transform: 'translateY(0px)',
        },
    },
}));

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
    color: theme.palette.primary.main,
    '& .MuiCircularProgress-circle': {
        strokeLinecap: 'round',
        strokeWidth: '5px',
    },
    animation: 'spin 1.5s linear infinite',
    '@keyframes spin': {
        '0%': {
            filter: 'hue-rotate(0deg)',
        },
        '100%': {
            filter: 'hue-rotate(360deg)',
        },
    },
}));

const LoadingText = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: 600,
    marginTop: theme.spacing(2),
    background: 'linear-gradient(45deg, #2196F3, #E91E63)',
    backgroundClip: 'text',
    textFillColor: 'transparent',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: 'gradient 2s ease-in-out infinite',
    '@keyframes gradient': {
        '0%': {
            backgroundPosition: '0% 50%',
        },
        '50%': {
            backgroundPosition: '100% 50%',
        },
        '100%': {
            backgroundPosition: '0% 50%',
        },
    },
    backgroundSize: '200% auto',
}));

const LoadingSubText = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(1),
    animation: 'pulse 1.5s ease-in-out infinite',
    '@keyframes pulse': {
        '0%': {
            opacity: 0.6,
        },
        '50%': {
            opacity: 1,
        },
        '100%': {
            opacity: 0.6,
        },
    },
}));

const Loader = ({ message = 'Loading', subMessage = 'Please wait while we prepare your experience...' }) => {
    return (
        <LoadingContainer>
            <LoadingBox>
                <StyledCircularProgress size={80} thickness={4} />
                <LoadingText variant="h4">
                    {message}
                </LoadingText>
                <LoadingSubText variant="body1">
                    {subMessage}
                </LoadingSubText>
            </LoadingBox>
        </LoadingContainer>
    );
};

export default Loader;
