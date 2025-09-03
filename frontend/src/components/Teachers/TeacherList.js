import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TeacherForm from './TeacherForm';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/teachers');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const handleEdit = (teacher) => {
    setSelectedTeacher(teacher);
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        await axios.delete(`http://localhost:5000/api/teachers/${id}`);
        fetchTeachers();
      } catch (error) {
        console.error('Error deleting teacher:', error);
      }
    }
  };

  const handleFormClose = () => {
    setOpenForm(false);
    setSelectedTeacher(null);
    fetchTeachers();
  };

  return (
    <div>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => setOpenForm(true)}
        style={{ marginBottom: '20px' }}
      >
        Add New Teacher
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Specialization</TableCell>
              <TableCell>Experience</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell>{teacher.name}</TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell>{teacher.department}</TableCell>
                <TableCell>{teacher.designation}</TableCell>
                <TableCell>{teacher.specialization}</TableCell>
                <TableCell>{teacher.experience} years</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(teacher)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(teacher.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {openForm && (
        <TeacherForm
          open={openForm}
          handleClose={handleFormClose}
          teacher={selectedTeacher}
        />
      )}
    </div>
  );
};

export default TeacherList;
