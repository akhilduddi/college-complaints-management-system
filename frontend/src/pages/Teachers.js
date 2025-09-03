import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Link,
  Alert,
  Snackbar,
  MenuItem,
  Container,
  Grid,
  useTheme,
  Card,
  CardContent,
  Avatar,
  Divider,
} from "@mui/material";
import { Person as PersonIcon } from "@mui/icons-material";
import { teacherLogin, teacherRegister } from "../services/api";

const Teachers = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    teacher_id: "",
    password: "",
    name: "",
    email: "",
    department: "CSE",
    designation: "Assistant Professor",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [loggedIn, setLoggedIn] = useState(false);

  const departments = ["CSE", "ECE", "EEE", "MECH", "CIVIL", "IT"];
  const designations = [
    "Assistant Professor",
    "Associate Professor",
    "Professor",
    "HOD",
    "Lab Assistant",
    "Guest Faculty",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? "login" : "register";

      // Prepare the data to send based on login/register
      const requestData = isLogin
        ? {
            teacher_id: formData.teacher_id,
            password: formData.password,
          }
        : formData;

      // Use the api functions instead of fetch
      const response = isLogin
        ? await teacherLogin(requestData)
        : await teacherRegister(requestData);

      const data = response.data;

      setSnackbar({
        open: true,
        message: isLogin
          ? "Login successful!"
          : "Registration successful! Please login.",
        severity: "success",
      });

      if (isLogin) {
        console.log(data);
        // Store user data and token
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        localStorage.setItem("userType", "teacher");
        setLoggedIn(true);
        // Redirect after successful login to view complaints
        setTimeout(() => navigate("/teacher-dashboard"), 1000);
      } else {
        // Switch to login form after successful registration
        setIsLogin(true);
        // Clear form except for teacher ID and password
        setFormData((prev) => ({
          ...prev,
          name: "",
          email: "",
          department: "CSE",
          designation: "Assistant Professor",
        }));
      }
    } catch (error) {
      console.error("Error:", error);
      setSnackbar({
        open: true,
        message: error.response?.data?.error || "An error occurred",
        severity: "error",
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Left Section - Welcome Message */}
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: "bold",
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {isLogin ? "Welcome Back!" : "Join Our Faculty"}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {isLogin
                ? "Access your teacher portal and manage your academic responsibilities."
                : "Create your teacher account to join our academic community."}
            </Typography>
          </Box>

          <Card
            elevation={0}
            sx={{
              bgcolor: "background.default",
              p: 3,
              borderRadius: 4,
              display: { xs: "none", md: "block" },
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    bgcolor: "secondary.main",
                    mr: 2,
                  }}
                >
                  <PersonIcon sx={{ fontSize: 32 }} />
                </Avatar>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Teacher Portal Features
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Manage your academic responsibilities efficiently
                  </Typography>
                </Box>
              </Box>

              <Grid container spacing={2}>
                {[
                  "Review Complaints",
                  "Track Student Progress",
                  "Manage Resources",
                  "Submit Reports",
                ].map((feature) => (
                  <Grid item xs={6} key={feature}>
                    <Paper
                      sx={{
                        p: 2,
                        textAlign: "center",
                        borderRadius: 2,
                        transition: "transform 0.2s",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: 2,
                        },
                      }}
                    >
                      <Typography variant="body2">{feature}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Section - Login/Register Form */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 4,
              backgroundColor: "background.paper",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
              },
            }}
          >
            {loggedIn && (
              <Box
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  zIndex: 1,
                }}
              >
                <Button
                  component={RouterLink}
                  to="/teacher-dashboard"
                  variant="contained"
                  color="secondary"
                  size="small"
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    boxShadow: 2,
                  }}
                >
                  Go to Dashboard
                </Button>
              </Box>
            )}

            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                mb: 4,
              }}
            >
              {isLogin ? "Teacher Login" : "Create Teacher Account"}
            </Typography>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Teacher ID"
                    name="teacher_id"
                    value={formData.teacher_id}
                    onChange={handleChange}
                    variant="outlined"
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>

                {!isLogin && (
                  <>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        variant="outlined"
                        required
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        }}
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
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        select
                        label="Department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        variant="outlined"
                        required
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        }}
                      >
                        {departments.map((dept) => (
                          <MenuItem key={dept} value={dept}>
                            {dept}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        select
                        label="Designation"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        variant="outlined"
                        required
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        }}
                      >
                        {designations.map((designation) => (
                          <MenuItem key={designation} value={designation}>
                            {designation}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </>
                )}

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    variant="outlined"
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    type="submit"
                    size="large"
                    sx={{
                      mt: 2,
                      borderRadius: 2,
                      textTransform: "none",
                      fontSize: "1.1rem",
                      py: 1.5,
                    }}
                  >
                    {isLogin ? "Login" : "Create Account"}
                  </Button>
                </Grid>
              </Grid>
            </form>

            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Divider sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  {isLogin
                    ? "New to the platform?"
                    : "Already have an account?"}
                </Typography>
              </Divider>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setIsLogin(!isLogin)}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                }}
              >
                {isLogin ? "Create New Account" : "Login to Existing Account"}
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Teachers;
