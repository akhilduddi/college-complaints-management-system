import React from 'react';
import { Box, Card, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  fadeIn, 
  slideInUp, 
  slideInLeft, 
  slideInRight, 
  scaleIn, 
  rotateIn, 
  bounce, 
  pulse, 
  float,
  ripple 
} from '../styles/animations';

export const FadeInBox = styled(Box)(({ theme, delay = 0 }) => ({
  animation: `${fadeIn} ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeOut}`,
  animationDelay: `${delay}ms`,
  animationFillMode: 'both',
}));

export const SlideUpBox = styled(Box)(({ theme, delay = 0 }) => ({
  animation: `${slideInUp} ${theme.transitions.duration.complex}ms ${theme.transitions.easing.easeOut}`,
  animationDelay: `${delay}ms`,
  animationFillMode: 'both',
}));

export const SlideInLeftBox = styled(Box)(({ theme, delay = 0 }) => ({
  animation: `${slideInLeft} ${theme.transitions.duration.complex}ms ${theme.transitions.easing.easeOut}`,
  animationDelay: `${delay}ms`,
  animationFillMode: 'both',
}));

export const SlideInRightBox = styled(Box)(({ theme, delay = 0 }) => ({
  animation: `${slideInRight} ${theme.transitions.duration.complex}ms ${theme.transitions.easing.easeOut}`,
  animationDelay: `${delay}ms`,
  animationFillMode: 'both',
}));

export const ScaleInBox = styled(Box)(({ theme, delay = 0 }) => ({
  animation: `${scaleIn} ${theme.transitions.duration.complex}ms ${theme.transitions.easing.easeOut}`,
  animationDelay: `${delay}ms`,
  animationFillMode: 'both',
}));

export const RotateInBox = styled(Box)(({ theme, delay = 0 }) => ({
  animation: `${rotateIn} ${theme.transitions.duration.complex}ms ${theme.transitions.easing.bouncy}`,
  animationDelay: `${delay}ms`,
  animationFillMode: 'both',
}));

export const BounceBox = styled(Box)(({ theme }) => ({
  animation: `${bounce} 2s ${theme.transitions.easing.bouncy} infinite`,
}));

export const PulseBox = styled(Box)(({ theme }) => ({
  animation: `${pulse} 2s ${theme.transitions.easing.easeInOut} infinite`,
}));

export const FloatBox = styled(Box)(({ theme }) => ({
  animation: `${float} 3s ${theme.transitions.easing.easeInOut} infinite`,
}));

export const RippleButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  transform: 'translate3d(0, 0, 0)',
  '&:after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    animation: `${ripple} 1s ${theme.transitions.easing.easeOut} infinite`,
  },
}));

export const AnimatedCard = styled(Card)(({ theme, animation = fadeIn }) => ({
  animation: `${animation} ${theme.transitions.duration.complex}ms ${theme.transitions.easing.easeOut}`,
  transition: theme.transitions.create(['transform', 'box-shadow']),
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
  },
}));

export const AnimatedTypography = styled(Typography)(({ theme, animation = fadeIn, delay = 0 }) => ({
  animation: `${animation} ${theme.transitions.duration.complex}ms ${theme.transitions.easing.easeOut}`,
  animationDelay: `${delay}ms`,
  animationFillMode: 'both',
}));
