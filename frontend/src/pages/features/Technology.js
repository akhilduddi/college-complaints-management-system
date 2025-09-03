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
  Grow
} from '@mui/material';
import {
  Computer,
  Code,
  Cloud,
  DevicesOther,
  Speed,
  Security
} from '@mui/icons-material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PageHeader from '../../components/PageHeader';
import BackToTop from '../../components/BackToTop';

const Technology = () => {
  const theme = useTheme();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  const features = [
    {
      title: 'Modern Labs',
      description: 'State-of-the-art computer labs with the latest hardware and software.',
      icon: <Computer fontSize="large" />,
      color: theme.palette.primary.main
    },
    {
      title: 'Cloud Infrastructure',
      description: 'Access to enterprise-level cloud platforms and services.',
      icon: <Cloud fontSize="large" />,
      color: theme.palette.secondary.main
    },
    {
      title: 'IoT & Robotics',
      description: 'Advanced robotics lab and IoT development platforms.',
      icon: <DevicesOther fontSize="large" />,
      color: theme.palette.success.main
    }
  ];

  const technologies = [
    {
      category: 'Software Development',
      items: ['React', 'Node.js', 'Python', 'Java', 'Machine Learning'],
      icon: <Code />,
      color: '#1976d2'
    },
    {
      category: 'Infrastructure',
      items: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes'],
      icon: <Speed />,
      color: '#2e7d32'
    },
    {
      category: 'Cybersecurity',
      items: ['Network Security', 'Ethical Hacking', 'Cryptography', 'Forensics'],
      icon: <Security />,
      color: '#ed6c02'
    }
  ];

  return (
    <Box>
      <Container maxWidth="lg">
        <PageHeader title="Modern Technology" />
      </Container>

      {/* Hero Section */}
      <Box
        sx={{
          height: '70vh',
          position: 'relative',
          backgroundImage: 'url(https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)',
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
                Cutting-Edge Technology
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
                Access to the latest technology and innovation platforms
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

      {/* Technologies Section */}
      <Box
        sx={{
          bgcolor: alpha(theme.palette.primary.main, 0.04),
          py: 12
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {technologies.map((tech, index) => (
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
                        boxShadow: `0 12px 20px -10px ${alpha(tech.color, 0.4)}`
                      }
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 3,
                        color: tech.color
                      }}
                    >
                      {tech.icon}
                      <Typography variant="h5" sx={{ ml: 1, fontWeight: 600 }}>
                        {tech.category}
                      </Typography>
                    </Box>
                    <Box component="ul" sx={{ pl: 2 }}>
                      {tech.items.map((item, idx) => (
                        <Typography
                          key={idx}
                          component="li"
                          variant="body1"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          {item}
                        </Typography>
                      ))}
                    </Box>
                  </Paper>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <BackToTop />
    </Box>
  );
};

export default Technology;
