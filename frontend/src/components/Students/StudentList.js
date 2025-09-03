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
import StudentForm from './StudentForm';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`http://localhost:5000/api/students/${id}`);
        fetchStudents();
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  const handleFormClose = () => {
    setOpenForm(false);
    setSelectedStudent(null);
    fetchStudents();
  };

  return (
    <div>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => setOpenForm(true)}
        style={{ marginBottom: '20px' }}
      >
        Add New Student
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Roll Number</TableCell>
              <TableCell>Branch</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.roll_number}</TableCell>
                <TableCell>{student.branch}</TableCell>
                <TableCell>{student.year}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(student)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(student.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {openForm && (
        <StudentForm
          open={openForm}
          handleClose={handleFormClose}
          student={selectedStudent}
        />
      )}
    </div>
  );
};

export default StudentList;
