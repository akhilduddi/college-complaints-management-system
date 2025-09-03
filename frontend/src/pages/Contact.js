import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  styled,
  Paper,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const HeroSection = styled(Paper)(({ theme }) => ({
  position: 'relative',
  background: 'linear-gradient(45deg, #000000 30%, #333333 90%)',
  color: '#ffffff',
  padding: theme.spacing(15, 0),
  marginBottom: theme.spacing(6),
  borderRadius: '40px',
  overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
}));

const ContactCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: '20px',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
  },
}));

const InfoCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: '20px',
  background: 'linear-gradient(45deg, #000000 30%, #333333 90%)',
  color: '#ffffff',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  '& svg': {
    marginRight: theme.spacing(2),
    fontSize: '2rem',
  },
}));

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  const contactInfo = [
    {
      icon: <LocationOnIcon />,
      title: 'Address',
      content: 'Narasaraopet Engineering College (Autonomous), Kotappakonda Road, Yellamanda (Post), Narasaraopet - 522601, Palnadu District, Andhra Pradesh',
      link: 'https://maps.app.goo.gl/4YdGJwHVFGBPGEQx7'
    },
    {
      icon: <PhoneIcon />,
      title: 'Phone',
      content: '08647-239903, 239904',
    },
    {
      icon: <EmailIcon />,
      title: 'Email',
      content: 'principal@nrtec.ac.in',
    },
    {
      icon: <AccessTimeIcon />,
      title: 'Office Hours',
      content: 'Monday - Saturday: 9:00 AM - 5:00 PM',
    },
  ];

  return (
    <Box>
      <HeroSection>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" gutterBottom fontWeight="bold">
                Contact Us
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                We're here to help and answer any questions you might have
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://nrtec.ac.in/wp-content/uploads/2023/04/nec-1.jpg"
                alt="NEC Campus"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '20px',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      <Container sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <ContactCard>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom fontWeight="bold">
                  Send us a Message
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                  Fill out the form below and we'll get back to you as soon as possible
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        multiline
                        rows={4}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{
                          py: 2,
                          borderRadius: '10px',
                          fontSize: '1.1rem',
                        }}
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </ContactCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoCard>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom fontWeight="bold" color="white">
                  Contact Information
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, opacity: 0.9, color: 'white' }}>
                  Get in touch with us through any of these channels
                </Typography>
                {contactInfo.map((info, index) => (
                  <IconWrapper key={index}>
                    {info.icon}
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        {info.title}
                      </Typography>
                      {info.link ? (
                        <Button
                          variant="text"
                          href={info.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            color: 'white',
                            textTransform: 'none',
                            p: 0,
                            '&:hover': {
                              textDecoration: 'underline',
                              backgroundColor: 'transparent'
                            }
                          }}
                        >
                          {info.content}
                        </Button>
                      ) : (
                        <Typography variant="body1" sx={{ opacity: 0.9 }}>
                          {info.content}
                        </Typography>
                      )}
                    </Box>
                  </IconWrapper>
                ))}
              </CardContent>
            </InfoCard>
          </Grid>
        </Grid>
      </Container>

      {/* Map Section */}
      <Container sx={{ mb: 8 }}>
        <Card sx={{ borderRadius: '20px', overflow: 'hidden' }}>
          <Box
            component="iframe"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.891681028501!2d80.05031007496747!3d16.016595084647414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a0a9d55555555%3A0x9f9b1e2c2d3d4d5e!2sNarasaraopet%20Engineering%20College!5e0!3m2!1sen!2sin!4v1609930493123!5m2!1sen!2sin"
            width="100%"
            height="450"
            frameBorder="0"
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
            sx={{ border: 0 }}
          />
        </Card>
      </Container>
    </Box>
  );
};

export default Contact;
