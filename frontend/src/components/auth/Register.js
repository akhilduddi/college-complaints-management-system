import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogTitle-root': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  '&:hover': {
    transform: 'translateY(-2px)',
    transition: 'all 0.3s ease-in-out',
  },
}));

const Register = ({ open, onClose, onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      
      localStorage.setItem('token', response.data.token);
      onRegisterSuccess(response.data.user);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setError('');
    onClose();
  };

  return (
    <StyledDialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Register</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              name="username"
              label="Username"
              fullWidth
              required
              value={formData.username}
              onChange={handleChange}
              autoComplete="username"
            />
            <TextField
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              required
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              fullWidth
              required
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              helperText="Password must be at least 6 characters long"
            />
            <TextField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              fullWidth
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <StyledButton onClick={handleClose}>Cancel</StyledButton>
          <StyledButton
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </StyledButton>
        </DialogActions>
      </form>
    </StyledDialog>
  );
};

export default Register;
