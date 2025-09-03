import { styled } from '@mui/material/styles';
import { Box, Card, Button, Container } from '@mui/material';
import { fadeIn, slideInLeft, slideInRight } from './animations';

export const PageContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(4),
  animation: `${fadeIn} ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeOut}`,
}));

export const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(8, 0),
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  marginBottom: theme.spacing(6),
  boxShadow: theme.shadows[3],
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 100%)',
    borderRadius: 'inherit',
  },
}));

export const AnimatedCard = styled(Card)(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  transition: theme.transitions.create(['transform', 'box-shadow']),
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[4],
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1, 3),
  textTransform: 'none',
  fontWeight: 500,
  transition: theme.transitions.create(['transform', 'box-shadow']),
  '&:hover': {
    transform: 'translateY(-2px)',
  },
}));

export const AnimatedButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  borderRadius: theme.shape.borderRadius,
  textTransform: 'none',
  fontWeight: 500,
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  transition: theme.transitions.create(['transform', 'box-shadow', 'background-color']),
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[2],
  },
}));

export const SectionContainer = styled(Box)(({ theme, index = 0 }) => ({
  padding: theme.spacing(6, 0),
  animation: `${index % 2 === 0 ? slideInLeft : slideInRight} ${theme.transitions.duration.complex}ms ${theme.transitions.easing.easeOut}`,
  animationDelay: `${index * 0.2}s`,
  animationFillMode: 'both',
}));
