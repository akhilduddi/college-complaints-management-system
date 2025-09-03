import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  useTheme,
  alpha,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Computer,
  Code,
  CloudQueue,
  Security,
  Psychology,
  Timeline,
  DataObject,
  Hub,
} from '@mui/icons-material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PageHeader from '../../components/PageHeader';
import BackToTop from '../../components/BackToTop';

const ComputerScience = () => {
  const theme = useTheme();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const specializations = [
    {
      title: 'Artificial Intelligence & Machine Learning',
      icon: <Psychology />,
      description: 'Deep learning, neural networks, and intelligent systems',
    },
    {
      title: 'Web & Mobile Development',
      icon: <Code />,
      description: 'Full-stack development, React, Android/iOS development',
    },
    {
      title: 'Cloud Computing & DevOps',
      icon: <CloudQueue />,
      description: 'AWS, Azure, Docker, Kubernetes, CI/CD',
    },
    {
      title: 'Cybersecurity',
      icon: <Security />,
      description: 'Network security, cryptography, and ethical hacking',
    },
  ];

  const courses = [
    'Data Structures and Algorithms',
    'Object-Oriented Programming',
    'Database Management Systems',
    'Operating Systems',
    'Computer Networks',
    'Software Engineering',
    'Web Technologies',
    'Artificial Intelligence & ML',
  ];

  const outcomes = [
    'Proficiency in multiple programming languages',
    'Strong problem-solving and analytical skills',
    'Experience with modern software development tools',
    'Understanding of software development lifecycle',
    'Knowledge of current industry practices',
    'Ability to work in team environments',
  ];

  return (
    <Box>
      <Box
        sx={{
          background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
          color: 'white',
          pt: 15,
          pb: 10,
        }}
      >
        <Container maxWidth="lg">
          <PageHeader title="Computer Science & Engineering" />
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom fontWeight="bold" data-aos="fade-right">
                Innovate Through Technology
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }} data-aos="fade-right" data-aos-delay="100">
                Join our cutting-edge Computer Science program and become a leader in the digital revolution
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{
                  mt: 2,
                  backgroundColor: '#ffffff',
                  color: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: alpha('#ffffff', 0.9),
                  },
                }}
                data-aos="fade-right"
                data-aos-delay="200"
              >
                Download Brochure
              </Button>
            </Grid>
            <Grid item xs={12} md={6} data-aos="fade-left">
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97"
                alt="Computer Science"
                sx={{
                  width: '100%',
                  borderRadius: 2,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Specializations Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom data-aos="fade-up">
          Our Specializations
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {specializations.map((spec, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} data-aos="fade-up" data-aos-delay={index * 100}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ color: theme.palette.primary.main, mb: 2 }}>
                    {spec.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {spec.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {spec.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Courses Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom data-aos="fade-up">
            Core Courses
          </Typography>
          <Grid container spacing={2} sx={{ mt: 4 }}>
            {courses.map((course, index) => (
              <Grid item xs={12} sm={6} md={3} key={index} data-aos="fade-up" data-aos-delay={index * 50}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {course}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Learning Outcomes */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom data-aos="fade-up">
          Learning Outcomes
        </Typography>
        <List>
          {outcomes.map((outcome, index) => (
            <ListItem key={index} data-aos="fade-up" data-aos-delay={index * 50}>
              <ListItemIcon>
                <Hub sx={{ color: theme.palette.primary.main }} />
              </ListItemIcon>
              <ListItemText primary={outcome} />
            </ListItem>
          ))}
        </List>
      </Container>

      <BackToTop />
    </Box>
  );
};

export default ComputerScience;
