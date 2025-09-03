import React, { useEffect, useState } from 'react';
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
  IconButton,
  Divider,
  useTheme,
  alpha,
  Fade,
  Slide
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  School,
  Computer,
  Group,
  EmojiEvents,
  LibraryBooks,
  Business,
  SportsSoccer,
  Brush,
  ArrowForward,
  Star,
  Timeline,
  Psychology,
  Lightbulb,
  MenuBook,
  People,
  LocationOn
} from '@mui/icons-material';

// Import images
const images = {
  hero: {
    main: 'https://res.cloudinary.com/dzrxab4oh/image/upload/v1736153321/osyv7tqievwipq8kvjpp.png ',
    cta: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80'
  },
  features: {
    education: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    technology: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    community: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80'
  },
  programs: {
    cse: 'https://res.cloudinary.com/dkz8lerpa/image/upload/v1706276583/cse_vqfmub.jpg',
    ece: 'https://res.cloudinary.com/dkz8lerpa/image/upload/v1706276583/ece_kqwx4t.jpg',
    eee: 'https://res.cloudinary.com/dkz8lerpa/image/upload/v1706276583/eee_qxkrww.jpg',
    mech: 'https://res.cloudinary.com/dkz8lerpa/image/upload/v1706276583/mech_qpvyqp.jpg'
  }
};

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const features = [
    {
      title: 'World-Class Education',
      description: 'Learn from industry experts and renowned academics in state-of-the-art facilities',
      image: images.features.education,
      icon: <School fontSize="large" />,
      color: theme.palette.primary.main
    },
    {
      title: 'Modern Technology',
      description: 'Access to cutting-edge labs and equipment with the latest technological innovations',
      image: images.features.technology,
      icon: <Computer fontSize="large" />,
      color: theme.palette.secondary.main
    },
    {
      title: 'Global Community',
      description: 'Connect with diverse students and faculty from around the world',
      image: images.features.community,
      icon: <Group fontSize="large" />,
      color: theme.palette.success.main
    },
  ];

 const programs = [
    {
      title: 'Computer Science Engineering',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      description: 'Advanced computing, AI/ML, and software development',
      icon: <Computer />,
      color: '#1976d2',
      link: '/programs/cse'
    },
    {
      title: 'Electronics & Communication',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      description: 'Communication systems, VLSI, and signal processing',
      icon: <Timeline />,
      color: '#2e7d32',
      link: '/programs/ece'
    },
    {
      title: 'Electrical & Electronics',
      image: 'https://images.unsplash.com/photo-1620283085439-39620a1e21c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      description: 'Power systems, control systems, and electrical machines',
      icon: <Lightbulb />,
      color: '#ed6c02',
      link: '/programs/eee'
    },
    {
      title: 'Mechanical Engineering',
      image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      description: 'Design, manufacturing, and thermal engineering',
      icon: <Business />,
      color: '#9c27b0',
      link: '/programs/mech'
    },
  ];

  const achievements = [
    { icon: <MenuBook sx={{ fontSize: 40 }} />, number: '50+', label: 'Programs Offered' },
    { icon: <People sx={{ fontSize: 40 }} />, number: '5000+', label: 'Students Enrolled' },
    { icon: <Star sx={{ fontSize: 40 }} />, number: '200+', label: 'Expert Faculty' },
    { icon: <EmojiEvents sx={{ fontSize: 40 }} />, number: '100+', label: 'Awards Won' },
  ];

  const values = [
    { icon: <Psychology />, title: 'Innovation', description: 'Fostering creative thinking and new ideas' },
    { icon: <Timeline />, title: 'Excellence', description: 'Striving for the highest standards in education' },
    { icon: <Lightbulb />, title: 'Research', description: 'Advancing knowledge through cutting-edge research' },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          backgroundImage: `url(${images.hero.main})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          },
        }}
      >
        <Container sx={{ position: 'relative', color: 'white', textAlign: 'center' }}>
          <Fade in={animate} timeout={1000}>
            <Box>
              <Typography 
                variant="h1" 
                sx={{ 
                  fontWeight: 800, 
                  mb: 3,
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  letterSpacing: '-0.5px'
                }}
              >
                Welcome to NEC College
              </Typography>
              <Typography 
                variant="h4" 
                sx={{ 
                  mb: 4, 
                  opacity: 0.9,
                  fontWeight: 300,
                  letterSpacing: '1px'
                }}
              >
                Shape Your Future with Excellence
              </Typography>
              <Box>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/about')}
                  sx={{ 
                    mr: 2, 
                    px: 4, 
                    py: 1.5,
                    borderRadius: '30px',
                    backgroundColor: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.9),
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Explore Programs
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/courses')}
                  sx={{ 
                    px: 4, 
                    py: 1.5, 
                    color: 'white', 
                    borderColor: 'white',
                    borderRadius: '30px',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Get Started
                </Button>
              </Box>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 12 }}>
        <Slide in={animate} direction="up" timeout={1000}>
          <Box>
            <Typography 
              variant="h3" 
              align="center" 
              gutterBottom 
              sx={{ 
                mb: 6,
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
              Why Choose Us?
            </Typography>
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card 
                    sx={{ 
                      height: '100%', 
                      transition: 'all 0.3s ease',
                      '&:hover': { 
                        transform: 'translateY(-8px)',
                        boxShadow: `0 12px 20px -10px ${alpha(feature.color, 0.4)}`
                      },
                      borderRadius: '16px',
                      overflow: 'hidden',
                      cursor: 'pointer'
                    }}
                    onClick={() => navigate(`/features/${feature.title.toLowerCase().replace(' ', '-')}`)}
                  >
                    <CardMedia
                      component="img"
                      height="240"
                      image={feature.image}
                      alt={feature.title}
                      sx={{
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.05)'
                        }
                      }}
                    />
                    <CardContent sx={{ textAlign: 'center', position: 'relative' }}>
                      <Box 
                        sx={{ 
                          mb: 2, 
                          color: feature.color,
                          transform: 'translateY(-50%)',
                          backgroundColor: 'white',
                          width: '64px',
                          height: '64px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '-32px auto 16px',
                          boxShadow: `0 8px 16px -8px ${alpha(feature.color, 0.4)}`
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography 
                        variant="h5" 
                        gutterBottom
                        sx={{ 
                          fontWeight: 600,
                          color: feature.color
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Slide>
      </Container>

      {/* Programs Section */}
      <Box sx={{ py: 8, bgcolor: 'grey.100' }}>
        <Container>
          <Typography 
            variant="h3" 
            align="center" 
            gutterBottom 
            sx={{ 
              mb: 6,
              fontWeight: 700
            }}
          >
            Our Programs
          </Typography>
          <Typography 
            variant="h6" 
            align="center" 
            color="text.secondary" 
            sx={{ mb: 6 }}
          >
            Choose from our diverse range of cutting-edge programs
          </Typography>
          <Grid container spacing={4}>
            {programs.map((program, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  onClick={() => navigate(program.link)}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 12px 24px ${alpha(program.color, 0.2)}`,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={program.image}
                    alt={program.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        p: 1,
                        borderRadius: '50%',
                        bgcolor: alpha(program.color, 0.1),
                        mb: 2,
                      }}
                    >
                      {React.cloneElement(program.icon, {
                        sx: { fontSize: 32, color: program.color },
                      })}
                    </Box>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                      {program.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {program.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Achievements Section */}
      <Box 
        sx={{ 
          py: 12,
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${images.hero.cta})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          color: 'white'
        }}
      >
        <Container>
          <Typography 
            variant="h3" 
            align="center" 
            gutterBottom 
            sx={{ 
              mb: 8,
              fontWeight: 700
            }}
          >
            Our Achievements
          </Typography>
          <Grid container spacing={4}>
            {achievements.map((achievement, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box 
                  sx={{ 
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)'
                    }
                  }}
                >
                  <Box sx={{ color: theme.palette.primary.main, mb: 2 }}>
                    {achievement.icon}
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
                    {achievement.number}
                  </Typography>
                  <Typography variant="h6" sx={{ opacity: 0.9 }}>
                    {achievement.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Values Section */}
      <Container sx={{ py: 12 }}>
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
          Our Values
        </Typography>
        <Grid container spacing={4}>
          {values.map((value, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 4, 
                  textAlign: 'center',
                  height: '100%',
                  borderRadius: '16px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 12px 20px -10px ${alpha(theme.palette.primary.main, 0.2)}`
                  }
                }}
              >
                <Box 
                  sx={{ 
                    color: theme.palette.primary.main,
                    mb: 2,
                    transform: 'scale(1.5)'
                  }}
                >
                  {value.icon}
                </Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  {value.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {value.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box 
        sx={{ 
          bgcolor: theme.palette.primary.main,
          color: 'white',
          py: 8,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container>
          <Box 
            sx={{ 
              textAlign: 'center',
              position: 'relative',
              zIndex: 1
            }}
          >
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
              Ready to Begin Your Journey?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Join us and transform your future today
            </Typography>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/contact')}
              sx={{ 
                color: 'white',
                borderColor: 'white',
                borderRadius: '30px',
                px: 4,
                py: 1.5,
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Contact Us
            </Button>
          </Box>
        </Container>
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
      </Box>
    </Box>
  );
};

export default Home;