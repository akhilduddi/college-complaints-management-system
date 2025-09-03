import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Grid,
} from '@mui/material';

const StudentForm = ({ open, handleClose, student }) => {
  const initialFormData = {
    name: '',
    email: '',
    password: '',
    roll_number: '',
    branch: '',
    year: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (student) {
      setFormData({
        ...student,
        password: '', // Don't populate password for security
      });
    } else {
      setFormData(initialFormData);
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!student && !formData.password) newErrors.password = 'Password is required';
    if (!formData.roll_number) newErrors.roll_number = 'Roll number is required';
    if (!formData.branch) newErrors.branch = 'Branch is required';
    if (!formData.year) newErrors.year = 'Year is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (student) {
        await axios.put(`http://localhost:5000/api/students/${student.id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/students', formData);
      }
      handleClose();
    } catch (error) {
      console.error('Error saving student:', error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      }
    }
  };

  const branches = ['CSE', 'ECE', 'ME', 'CE'];
  const years = [1, 2, 3, 4];

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{student ? 'Edit Student' : 'Add New Student'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
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
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            {!student && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Roll Number"
                name="roll_number"
                value={formData.roll_number}
                onChange={handleChange}
                error={!!errors.roll_number}
                helperText={errors.roll_number}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                error={!!errors.branch}
                helperText={errors.branch}
              >
                {branches.map((branch) => (
                  <MenuItem key={branch} value={branch}>
                    {branch}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                error={!!errors.year}
                helperText={errors.year}
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {student ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default StudentForm;
