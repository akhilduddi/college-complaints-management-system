import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Typography,
  styled,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WorkIcon from '@mui/icons-material/Work';
import Loader from '../components/Loader/Loader';

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(6),
  marginBottom: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 100%)',
      borderRadius: 'inherit',
  },
  '&::after': {
      content: '""',
      position: 'absolute',
      top: '-50%',
      right: '-50%',
      width: '100%',
      height: '100%',
      background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 60%)',
      transform: 'rotate(30deg)',
  }
}));

const HeroContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  textAlign: 'center',
}));

const CourseCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease-in-out',
  background: '#ffffff',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
  },
}));

const CourseMediaWrapper = styled(CardMedia)(({ theme }) => ({
  height: 240,
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)',
  },
}));

const CourseImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const CourseInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const InfoIcon = styled(Box)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

const EnrollButton = styled(Button)(({ theme }) => ({
  background: '#000',
  color: '#fff',
  '&:hover': {
    background: '#333',
    transform: 'translateY(-2px)',
  },
}));

const courses = [
  {
    id: 'cse',
    title: 'Computer Science Engineering',
    duration: '4 Years',
    fee: '₹1,20,000/year',
    placement: '95%',
    image: 'https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    coverImage: 'https://images.unsplash.com/photo-1623479322729-28b25c16b011?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    labImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 'ece',
    title: 'Electronics & Communication',
    duration: '4 Years',
    fee: '₹1,15,000/year',
    placement: '92%',
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    coverImage: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    labImage: 'https://images.unsplash.com/photo-1581092334247-ddef2a41a4f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 'me',
    title: 'Mechanical Engineering',
    duration: '4 Years',
    fee: '₹1,10,000/year',
    placement: '90%',
    image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    coverImage: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    labImage: 'https://images.unsplash.com/photo-1581092160607-f6aa4887ab6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 'civil',
    title: 'Civil Engineering',
    duration: '4 Years',
    fee: '₹1,10,000/year',
    placement: '88%',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    coverImage: 'https://images.unsplash.com/photo-1581092160607-f6aa4887ab6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    labImage: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
];

const Courses = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [openAuthDialog, setOpenAuthDialog] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleEnrollClick = (branchId) => {
    setSelectedBranch(branchId);
    setOpenAuthDialog(true);
  };

  const handleDialogClose = () => {
    setOpenAuthDialog(false);
  };

  const handleRegisterClick = () => {
    setOpenAuthDialog(false);
    navigate('/register');
  };

  const handleLoginClick = () => {
    setOpenAuthDialog(false);
    navigate('/login');
  };

  if (loading) {
    return <Loader message="Loading Courses" subMessage="Please wait while we fetch the course information..." />;
  }

  return (
    <Box>
      <HeroSection>
                <Box sx={{ position: 'relative', zIndex: 2, p: 4 }}>
                    <Typography 
                        variant="h3" 
                        gutterBottom 
                        align="center"
                        sx={{
                            fontWeight: 700,
                            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                            mb: 3
                        }}
                    >
                        Our Courses
                    </Typography>
                    <Typography 
                        variant="h6" 
                        align="center" 
                        sx={{ 
                            mb: 4, 
                            opacity: 0.9,
                            maxWidth: '800px',
                            mx: 'auto',
                            lineHeight: 1.6
                        }}
                    >
                        Choose from our wide range of engineering programs
                    </Typography>
                </Box>
            </HeroSection>

      <Container>
        <Grid container spacing={4}>
          {courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <CourseCard>
                <CourseMediaWrapper>
                  <CourseImage src={course.image} alt={course.title} />
                </CourseMediaWrapper>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {course.title}
                  </Typography>
                  <CourseInfo>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <InfoIcon>
                        <AccessTimeIcon />
                      </InfoIcon>
                      <Typography variant="body2">{course.duration}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <InfoIcon>
                        <SchoolIcon />
                      </InfoIcon>
                      <Typography variant="body2">{course.fee}</Typography>
                    </Box>
                  </CourseInfo>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <InfoIcon>
                      <WorkIcon />
                    </InfoIcon>
                    <Typography variant="body2">
                      Placement Rate: {course.placement}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <EnrollButton
                    fullWidth
                    variant="contained"
                    onClick={() => handleEnrollClick(course.id)}
                  >
                    Enroll Now
                  </EnrollButton>
                </CardActions>
              </CourseCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Authentication Dialog */}
      <Dialog
        open={openAuthDialog}
        onClose={handleDialogClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          elevation: 24,
          sx: {
            borderRadius: '20px',
            padding: '16px',
            backgroundColor: '#ffffff',
          },
        }}
      >
        <DialogTitle 
          sx={{ 
            textAlign: 'center', 
            fontSize: '1.75rem',
            fontWeight: 600,
            color: '#000',
            pt: 3
          }}
        >
          Join Us to Enroll
        </DialogTitle>
        <DialogContent>
          <DialogContentText 
            sx={{ 
              textAlign: 'center', 
              mb: 4,
              color: '#666',
              px: 2
            }}
          >
            Create an account or login to enroll in our courses and start your journey with us.
          </DialogContentText>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, px: 2 }}>
            <Button
              variant="contained"
              onClick={handleRegisterClick}
              sx={{
                py: 1.5,
                borderRadius: '12px',
                backgroundColor: '#000',
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#333',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                },
              }}
            >
              Register Now
            </Button>
            <Button
              variant="outlined"
              onClick={handleLoginClick}
              sx={{
                py: 1.5,
                borderRadius: '12px',
                borderColor: '#000',
                borderWidth: 2,
                color: '#000',
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  borderColor: '#333',
                  backgroundColor: 'rgba(0,0,0,0.04)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                },
              }}
            >
              Login to Account
            </Button>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button 
            onClick={handleDialogClose}
            sx={{ 
              color: '#666',
              fontSize: '1rem',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.04)',
              },
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Courses;
