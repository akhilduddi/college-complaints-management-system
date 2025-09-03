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
  School,
  Star,
  GroupWork,
  Timeline,
  EmojiEvents,
  MenuBook
} from '@mui/icons-material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PageHeader from '../../components/PageHeader';
import BackToTop from '../../components/BackToTop';

const Education = () => {
  const theme = useTheme();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  const programs = [
    {
      title: 'Expert Faculty',
      description: 'Learn from industry veterans and acclaimed academics with years of experience.',
      icon: <School fontSize="large" />,
      color: theme.palette.primary.main
    },
    {
      title: 'Research Opportunities',
      description: 'Engage in cutting-edge research projects with real-world applications.',
      icon: <MenuBook fontSize="large" />,
      color: theme.palette.secondary.main
    },
    {
      title: 'Global Recognition',
      description: 'Our programs are internationally accredited and recognized worldwide.',
      icon: <EmojiEvents fontSize="large" />,
      color: theme.palette.success.main
    }
  ];

  const stats = [
    { number: '200+', label: 'Expert Faculty Members', icon: <GroupWork /> },
    { number: '50+', label: 'Research Centers', icon: <Timeline /> },
    { number: '95%', label: 'Graduate Employment Rate', icon: <Star /> }
  ];

  return (
    <Box>
      <Container maxWidth="lg">
        <PageHeader title="World-Class Education" />
      </Container>
      
      {/* Hero Section */}
      <Box
        sx={{
          height: '70vh',
          position: 'relative',
          backgroundImage: 'url(https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)',
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
                World-Class Education
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
                Experience excellence in education with our renowned faculty and innovative programs
              </Typography>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Programs Section */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Grid container spacing={6}>
          {programs.map((program, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box data-aos="fade-up" data-aos-delay={index * 100}>
                <Card
                  sx={{
                    height: '100%',
                    borderRadius: 4,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 12px 20px -10px ${alpha(program.color, 0.4)}`
                    }
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Box
                      sx={{
                        mb: 3,
                        color: program.color,
                        transform: 'scale(1.5)'
                      }}
                    >
                      {program.icon}
                    </Box>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                      {program.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {program.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Stats Section */}
      <Box
        sx={{
          bgcolor: alpha(theme.palette.primary.main, 0.04),
          py: 12
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box data-aos="zoom-in" data-aos-delay={index * 100}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      textAlign: 'center',
                      height: '100%',
                      borderRadius: 4,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 12px 20px -10px ${alpha(theme.palette.primary.main, 0.2)}`
                      }
                    }}
                  >
                    <Box
                      sx={{
                        mb: 2,
                        color: theme.palette.primary.main,
                        transform: 'scale(1.5)'
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography
                      variant="h3"
                      sx={{
                        mb: 1,
                        fontWeight: 700,
                        background: `-webkit-linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      {stat.label}
                    </Typography>
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

export default Education;
