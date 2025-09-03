import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Divider,
  Alert,
  Card,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Autocomplete,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Google,
  GitHub,
  LinkedIn,
  School,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const images = {
  background: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
};

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    roll_number: '',
    branch: '',
    year: '',
    department: '',
    designation: '',
    specialization: '',
    experience: '',
    qualifications: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQualificationChange = (value) => {
    setFormData((prev) => ({ ...prev, qualifications: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (formData.role === 'student') {
        // Validate student fields
        if (
          !formData.name ||
          !formData.email ||
          !formData.password ||
          !formData.roll_number ||
          !formData.branch ||
          !formData.year
        ) {
          setError('All fields are required');
          return;
        }

        const studentData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          roll_number: formData.roll_number,
          branch: formData.branch,
          year: formData.year,
        };

        response = await axios.post('http://localhost:5000/api/students', studentData);
      } else {
        // Validate teacher fields
        if (
          !formData.name ||
          !formData.email ||
          !formData.password ||
          !formData.department ||
          !formData.designation ||
          !formData.specialization ||
          !formData.experience
        ) {
          setError('All fields are required');
          return;
        }

        const teacherData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          department: formData.department,
          designation: formData.designation,
          specialization: formData.specialization,
          experience: formData.experience,
          qualifications: formData.qualifications,
        };

        response = await axios.post('http://localhost:5000/api/teachers', teacherData);
      }

      console.log('Registration successful:', response.data);
      navigate('/login');
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Registration failed');
      } else {
        setError('Network error occurred');
      }
      console.error('Registration error:', error);
    }
  };

  const handleSocialRegister = (provider) => {
    console.log(`Registering with ${provider}`);
    // Add social registration logic here
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: `url(${images.background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        py: 4,
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
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Card
          sx={{
            p: 4,
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            borderRadius: 2,
            transition: '0.3s',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 12px 48px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, justifyContent: 'center' }}>
            <School sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
              }}
            >
              Create Account
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl component="fieldset" fullWidth>
                  <FormLabel>Role</FormLabel>
                  <RadioGroup
                    row
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <FormControlLabel value="student" control={<Radio />} label="Student" />
                    <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  variant="outlined"
                  required
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
                  variant="outlined"
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {formData.role === 'student' ? (
                // Student specific fields
                <>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Roll Number"
                      name="roll_number"
                      value={formData.roll_number}
                      onChange={handleChange}
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Branch"
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Year"
                      name="year"
                      type="number"
                      value={formData.year}
                      onChange={handleChange}
                      variant="outlined"
                      required
                      inputProps={{ min: 1, max: 4 }}
                    />
                  </Grid>
                </>
              ) : (
                // Teacher specific fields
                <>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Designation"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Specialization"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Experience (in years)"
                      name="experience"
                      type="number"
                      value={formData.experience}
                      onChange={handleChange}
                      variant="outlined"
                      required
                      inputProps={{ min: 0 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Autocomplete
                      multiple
                      freeSolo
                      options={[]}
                      value={formData.qualifications}
                      onChange={(_, newValue) => handleQualificationChange(newValue)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Qualifications"
                          placeholder="Add qualifications"
                        />
                      )}
                    />
                  </Grid>
                </>
              )}
            </Grid>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              sx={{
                mt: 4,
                mb: 3,
                height: 56,
                fontSize: '1.1rem',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              Register
            </Button>
          </form>

          <Box sx={{ my: 3 }}>
            <Divider>
              <Typography variant="body2" sx={{ color: 'text.secondary', px: 2 }}>
                OR REGISTER WITH
              </Typography>
            </Divider>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              mb: 3,
            }}
          >
            {[
              { icon: <Google />, name: 'Google', color: '#DB4437' },
              { icon: <GitHub />, name: 'GitHub', color: '#333' },
              { icon: <LinkedIn />, name: 'LinkedIn', color: '#0077B5' },
            ].map((social) => (
              <IconButton
                key={social.name}
                onClick={() => handleSocialRegister(social.name)}
                sx={{
                  bgcolor: social.color,
                  color: 'white',
                  width: 48,
                  height: 48,
                  transition: '0.3s',
                  '&:hover': {
                    bgcolor: social.color,
                    transform: 'translateY(-4px)',
                    boxShadow: `0 4px 12px ${social.color}40`,
                  },
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>

          <Typography
            variant="body2"
            align="center"
            sx={{ color: 'text.secondary' }}
          >
            Already have an account?{' '}
            <Button
              color="primary"
              onClick={() => navigate('/login')}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'transparent',
                  textDecoration: 'underline',
                },
              }}
            >
              Sign in
            </Button>
          </Typography>
        </Card>
      </Container>
    </Box>
  );
};

export default Register;
