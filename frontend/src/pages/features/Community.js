import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Paper,
  useTheme,
  alpha,
  Fade,
  Avatar,
  AvatarGroup
} from '@mui/material';
import {
  Group,
  Public,
  Forum,
  Diversity3,
  EmojiEvents,
  Handshake
} from '@mui/icons-material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PageHeader from '../../components/PageHeader';
import BackToTop from '../../components/BackToTop';

const Community = () => {
  const theme = useTheme();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  const features = [
    {
      title: 'Global Network',
      description: 'Connect with students and alumni from over 50 countries worldwide.',
      icon: <Public fontSize="large" />,
      color: theme.palette.primary.main
    },
    {
      title: 'Cultural Exchange',
      description: 'Participate in cultural events, festivals, and international programs.',
      icon: <Diversity3 fontSize="large" />,
      color: theme.palette.secondary.main
    },
    {
      title: 'Student Clubs',
      description: 'Join various student clubs and organizations based on your interests.',
      icon: <Group fontSize="large" />,
      color: theme.palette.success.main
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'International Student',
      country: 'Canada',
      avatar: 'https://i.pravatar.cc/150?img=1',
      quote: 'The diverse community here has given me a global perspective and lifelong friendships.'
    },
    {
      name: 'Miguel Rodriguez',
      role: 'Exchange Student',
      country: 'Spain',
      avatar: 'https://i.pravatar.cc/150?img=2',
      quote: 'The cultural exchange programs have enriched my academic experience immensely.'
    },
    {
      name: 'Yuki Tanaka',
      role: 'Alumni',
      country: 'Japan',
      avatar: 'https://i.pravatar.cc/150?img=3',
      quote: 'Being part of this community opened doors to international opportunities.'
    }
  ];

  return (
    <Box>
      <Container maxWidth="lg">
        <PageHeader title="Global Community" />
      </Container>

      {/* Hero Section */}
      <Box
        sx={{
          height: '70vh',
          position: 'relative',
          backgroundImage: 'url(https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          display: 'flex',
          alignItems: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Fade in timeout={1000}>
            <Box>
              <Typography
                variant="h1"
                sx={{
                  color: 'white',
                  fontWeight: 800,
                  mb: 3,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                }}
              >
                Global Community
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color: 'white',
                  mb: 4,
                  maxWidth: '800px',
                  opacity: 0.9
                }}
              >
                Join a vibrant international community of learners and innovators
              </Typography>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Grid container spacing={6}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box data-aos="fade-up" data-aos-delay={index * 100}>
                <Card
                  sx={{
                    height: '100%',
                    borderRadius: 4,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 12px 20px -10px ${alpha(feature.color, 0.4)}`
                    }
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Box
                      sx={{
                        mb: 3,
                        color: feature.color,
                        transform: 'scale(1.5)'
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Box
        sx={{
          bgcolor: alpha(theme.palette.primary.main, 0.04),
          py: 12
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{
              mb: 8,
              fontWeight: 700,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-16px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '4px',
                backgroundColor: theme.palette.primary.main,
                borderRadius: '2px'
              }
            }}
          >
            Student Stories
          </Typography>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box data-aos="zoom-in" data-aos-delay={index * 100}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      height: '100%',
                      borderRadius: 4,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 12px 20px -10px ${alpha(theme.palette.primary.main, 0.2)}`
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Avatar
                        src={testimonial.avatar}
                        sx={{ width: 64, height: 64, mr: 2 }}
                      />
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role} from {testimonial.country}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{
                        fontStyle: 'italic',
                        '&::before': {
                          content: '"""',
                          fontSize: '24px',
                          color: theme.palette.primary.main,
                          marginRight: '4px'
                        },
                        '&::after': {
                          content: '"""',
                          fontSize: '24px',
                          color: theme.palette.primary.main,
                          marginLeft: '4px'
                        }
                      }}
                    >
                      {testimonial.quote}
                    </Typography>
                  </Paper>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Join Community Section */}
      <Box sx={{ py: 12 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              textAlign: 'center',
              p: 6,
              borderRadius: 4,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '-50%',
                right: '-10%',
                width: '60%',
                height: '200%',
                background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
                transform: 'rotate(30deg)'
              }}
            />
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, position: 'relative' }}>
              Join Our Community
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, maxWidth: '600px', mx: 'auto', position: 'relative' }}>
              Be part of a diverse and inclusive community that celebrates cultural exchange and global perspectives
            </Typography>
            <Button
              variant="outlined"
              size="large"
              sx={{
                color: 'white',
                borderColor: 'white',
                borderRadius: '30px',
                px: 4,
                py: 1.5,
                position: 'relative',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Get Started
            </Button>
          </Box>
        </Container>
      </Box>
      <BackToTop />
    </Box>
  );
};

export default Community;
