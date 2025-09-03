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
  ElectricBolt,
  PowerSettingsNew,
  ElectricalServices,
  BatteryChargingFull,
  Bolt,
  SettingsInputComponent,
  ElectricMeter,
  Hub,
} from '@mui/icons-material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PageHeader from '../../components/PageHeader';
import BackToTop from '../../components/BackToTop';

const DigitalArts = () => {
  const theme = useTheme();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const specializations = [
    {
      title: 'Power Systems',
      icon: <ElectricBolt />,
      description: 'Generation, transmission, and distribution of electrical power',
    },
    {
      title: 'Control Systems',
      icon: <SettingsInputComponent />,
      description: 'Automation, robotics, and industrial control systems',
    },
    {
      title: 'Power Electronics',
      icon: <PowerSettingsNew />,
      description: 'Converters, inverters, and motor drives',
    },
    {
      title: 'Electrical Machines',
      icon: <ElectricalServices />,
      description: 'Motors, generators, and transformers',
    },
  ];

  const courses = [
    'Electrical Machines',
    'Power Systems',
    'Control Systems',
    'Power Electronics',
    'Electrical Measurements',
    'High Voltage Engineering',
    'Switchgear & Protection',
    'Electric Drives',
  ];

  const outcomes = [
    'Design and analyze electrical systems',
    'Implement power electronics solutions',
    'Develop control system applications',
    'Understanding of electrical machines',
    'Knowledge of power distribution',
    'Skills in electrical system protection',
  ];

  return (
    <Box>
      <Box
        sx={{
          background: 'linear-gradient(45deg, #f57c00 30%, #ff9800 90%)',
          color: 'white',
          pt: 15,
          pb: 10,
        }}
      >
        <Container maxWidth="lg">
          <PageHeader title="Electrical & Electronics Engineering" />
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom fontWeight="bold" data-aos="fade-right">
                Power the Future
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }} data-aos="fade-right" data-aos-delay="100">
                Drive innovation in electrical power and energy systems
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
                src="https://images.unsplash.com/photo-1620283085439-39620a1e21c4"
                alt="Electrical Engineering"
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

export default DigitalArts;
