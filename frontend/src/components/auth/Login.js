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

const Login = ({ open, onClose, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      onLoginSuccess(response.data.user);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ email: '', password: '' });
    setError('');
    onClose();
  };

  return (
    <StyledDialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Login</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
              autoComplete="current-password"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <StyledButton onClick={handleClose}>Cancel</StyledButton>
          <StyledButton
            type="submit"
            variant="contained"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </StyledButton>
        </DialogActions>
      </form>
    </StyledDialog>
  );
};

export default Login;
