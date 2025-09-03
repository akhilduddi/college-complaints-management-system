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
import { School as SchoolIcon } from "@mui/icons-material";

const Students = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    roll_number: "",
    password: "",
    name: "",
    email: "",
    branch: "CSE",
    year: "1",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [loggedIn, setLoggedIn] = useState(false);

  const branches = ["CSE", "ECE", "EEE", "MECH", "CIVIL", "IT"];
  const years = ["1", "2", "3", "4"];

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
      const url = `http://localhost:7800/api/students/${endpoint}`;

      // Prepare the data to send based on login/register
      const requestData = isLogin
        ? {
            roll_number: formData.roll_number,
            password: formData.password,
          }
        : formData;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to process request");
      }

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
        setLoggedIn(true);
        // Redirect after successful login
        setTimeout(() => navigate("/complaints"), 1000);
      } else {
        // Switch to login form after successful registration
        setIsLogin(true);
        // Clear form except for roll number and password
        setFormData((prev) => ({
          ...prev,
          name: "",
          email: "",
          branch: "CSE",
          year: "1",
        }));
      }
    } catch (error) {
      console.error("Error:", error);
      setSnackbar({
        open: true,
        message: error.message || "An error occurred",
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
              {isLogin ? "Welcome Back!" : "Join Our Community"}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {isLogin
                ? "Access your student portal and manage your academic journey."
                : "Create your student account to get started with your academic journey."}
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
                    bgcolor: "primary.main",
                    mr: 2,
                  }}
                >
                  <SchoolIcon sx={{ fontSize: 32 }} />
                </Avatar>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Student Portal Features
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Access all your academic resources in one place
                  </Typography>
                </Box>
              </Box>

              <Grid container spacing={2}>
                {[
                  "View Complaints",
                  "Track Progress",
                  "Access Resources",
                  "Submit Requests",
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
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
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
                  to="/complaints"
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    boxShadow: 2,
                  }}
                >
                  Go to Complaints
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
              {isLogin ? "Student Login" : "Create Student Account"}
            </Typography>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Roll Number"
                    name="roll_number"
                    value={formData.roll_number}
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
                        label="Branch"
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                        variant="outlined"
                        required
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        }}
                      >
                        {branches.map((branch) => (
                          <MenuItem key={branch} value={branch}>
                            {branch}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        select
                        label="Year"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        variant="outlined"
                        required
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        }}
                      >
                        {years.map((year) => (
                          <MenuItem key={year} value={year}>
                            Year {year}
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
                    color="primary"
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
                color="primary"
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

export default Students;
