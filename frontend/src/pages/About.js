import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Button,
} from '@mui/material';
import {
  School,
  Psychology,
  Diversity3,
  EmojiEvents,
  LinkedIn,
  Email,
} from '@mui/icons-material';

const images = {
  hero: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
  campus: 'https://res.cloudinary.com/dkz8lerpa/image/upload/v1737898380/nec-3_pbcc9y.png ',
  library: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
  team: {
    principal: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    academic: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    research: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  }
};

const About = () => {
  const values = [
    {
      icon: <School fontSize="large" />,
      title: 'Academic Excellence',
      description: 'Committed to the highest standards of education and research',
    },
    {
      icon: <Psychology fontSize="large" />,
      title: 'Innovation',
      description: 'Fostering creativity and technological advancement',
    },
    {
      icon: <Diversity3 fontSize="large" />,
      title: 'Diversity',
      description: 'Embracing different perspectives and cultures',
    },
    {
      icon: <EmojiEvents fontSize="large" />,
      title: 'Achievement',
      description: 'Celebrating success and continuous improvement',
    },
  ];

  const team = [
    {
      name: 'Dr S. Venkateswarulu',
      role: 'Principal',
      image: 'https://res.cloudinary.com/dkz8lerpa/image/upload/v1736227160/giye7fsija3xfl78yrzz.webp',
      bio: '36 years of teaching, Industry, and research experience ',
      social: {
        linkedin: '#',
        email: 'venkateswarulu@gmail.com',
      },
    },
    {
      name: 'Dr S N Tirumala Rao',
      role: 'Head of Department',
      image: 'https://res.cloudinary.com/dkz8lerpa/image/upload/v1736227471/cse-hod-thirumalrao_aojyur.jpg',
      bio: '21 years of teaching ,research and devolepment experience',
      social: {
        linkedin: '#',
        email: 'michael.chen@example.com',
      },
    },
    {
      name: 'M.Sireesha',
      role: 'Project Guide',
      image: 'data:image/jpeg;base64,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',
      bio: '16 years of teaching ,research and devolepment experience',
      social: {
        linkedin: 'https://www.linkedin.com/in/sireesha-moturi-22078968/',
        email: 'sireeshamoturi@gmail.com',
      },
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          height: '60vh',
          position: 'relative',
          backgroundImage: `url(${images.hero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
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
          },
        }}
      >
        <Container sx={{ position: 'relative', color: 'white', textAlign: 'center' }}>
          <Typography variant="h2" gutterBottom>
            About Us
          </Typography>
          <Typography variant="h5">
            Shaping the Future Through Education Since 1990
          </Typography>
        </Container>
      </Box>

      {/* Mission Section */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph>
              At Narasaraopeta Engineering College, we are dedicated to providing world-class education
              that empowers students to become leaders in their chosen fields. Our
              commitment to excellence, innovation, and practical learning sets us apart.
            </Typography>
            <Typography variant="body1">
              We believe in creating an environment where creativity flourishes,
              research thrives, and students are prepared for the challenges of
              tomorrow's world.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                height="400"
                 image={images.campus}
                alt="Campus"
              />
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Values Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container>
          <Typography variant="h3" align="center" gutterBottom sx={{ mb: 6 }}>
            Our Values
          </Typography>
          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    textAlign: 'center',
                    transition: '0.3s',
                    '&:hover': { transform: 'translateY(-8px)' }
                  }}
                >
                  <CardContent>
                    <Box sx={{ color: 'primary.main', mb: 2 }}>
                      {value.icon}
                    </Box>
                    <Typography variant="h5" gutterBottom>
                      {value.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Facilities Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ mb: 6 }}>
          Our Facilities
        </Typography>
        <Card sx={{ position: 'relative', mb: 6 }}>
          <CardMedia
            component="img"
            height="400"
            image={images.library}
            alt="Library"
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              bgcolor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              p: 3,
            }}
          >
            <Typography variant="h5" gutterBottom>
               Library
            </Typography>
            <Typography variant="body1">
              Our library houses over 50,000 books and provides access to
              extensive digital resources, creating the perfect environment for
              research and study.
            </Typography>
          </Box>
        </Card>
      </Container>

      {/* Team Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container>
          <Typography variant="h3" align="center" gutterBottom sx={{ mb: 6 }}>
            Leadership Team
          </Typography>
          <Grid container spacing={4}>
            {team.map((member, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    transition: '0.3s',
                    '&:hover': { transform: 'translateY(-8px)' }
                  }}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Avatar
                      src={member.image}
                      sx={{
                        width: 120,
                        height: 120,
                        mx: 'auto',
                        mb: 2,
                        border: 3,
                        borderColor: 'primary.main',
                      }}
                    />
                    <Typography variant="h5" gutterBottom>
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle1" color="primary" gutterBottom>
                      {member.role}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {member.bio}
                    </Typography>
                    <Box>
                      <Button
                        startIcon={<LinkedIn />}
                        href={member.social.linkedin}
                        target="_blank"
                        sx={{ mr: 1 }}
                      >
                        LinkedIn
                      </Button>
                      <Button
                        startIcon={<Email />}
                        href={`mailto:${member.social.email}`}
                      >
                        Email
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default About;
