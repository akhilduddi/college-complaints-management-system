import React, { useState } from "react";
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
  MenuItem,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const images = {
  background:
    "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
};

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    branch: "cse", // Default branch
  });

  const branches = [
    { id: "cse", name: "Computer Science and Engineering" },
    { id: "ece", name: "Electronics and Communication Engineering" },
    { id: "me", name: "Mechanical Engineering" },
    { id: "civil", name: "Civil Engineering" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      const { token, user } = response.data;

      // Store token and user data in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Navigate to the selected branch details page
      navigate(`/branch-details/${formData.branch}`);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Network error occurred");
      }
      console.error("Login error:", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: `url(${images.background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <Card
          sx={{
            p: 4,
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            borderRadius: 2,
            transition: "0.3s",
            "&:hover": {
              transform: "translateY(-8px)",
              boxShadow: "0 12px 48px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ fontWeight: 700, color: "primary.main" }}
            >
              Welcome Back
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Sign in to continue to your account
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              select
              label="Select Branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              required
              sx={{ mb: 2 }}
            >
              {branches.map((branch) => (
                <MenuItem key={branch.id} value={branch.id}>
                  {branch.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              required
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              required
              sx={{ mb: 3 }}
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 2,
                mb: 3,
                height: 48,
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              Sign In
            </Button>
          </form>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography variant="body2" color="textSecondary">
              Don't have an account?{" "}
              <Button
                color="primary"
                onClick={() => navigate("/register")}
                sx={{ textTransform: "none" }}
              >
                Sign Up
              </Button>
            </Typography>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;
