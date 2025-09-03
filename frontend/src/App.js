import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout/Layout";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import TeacherDashboard from "./pages/TeacherDashboard";
import Courses from "./pages/Courses";
import BranchDetails from "./pages/BranchDetails";
import Calendar from "./pages/Calendar";
import Library from "./pages/Library";
import StudentPortal from "./pages/StudentPortal";
import Register from "./pages/Register";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Education from "./pages/features/Education";
import Technology from "./pages/features/Technology";
import Community from "./pages/features/Community";
import ComputerScience from "./pages/programs/ComputerScience";
import BusinessManagement from "./pages/programs/BusinessManagement";
import DigitalArts from "./pages/programs/DigitalArts";
import SportsScience from "./pages/programs/SportsScience";
import { Box } from "@mui/material";
import Complaint from "./pages/Complaint";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000000",
      light: "#333333",
      dark: "#000000",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#FF4081",
      light: "#FF79B0",
      dark: "#C60055",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f8f9fa",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#666666",
    },
    divider: "rgba(0, 0, 0, 0.12)",
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "3rem",
      fontWeight: 600,
      letterSpacing: "-0.5px",
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 600,
      letterSpacing: "-0.5px",
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 600,
      letterSpacing: "-0.5px",
    },
    h4: {
      fontSize: "1.75rem",
      fontWeight: 500,
      letterSpacing: "-0.5px",
    },
    h5: {
      fontSize: "1.5rem",
      fontWeight: 500,
      letterSpacing: "-0.5px",
    },
    h6: {
      fontSize: "1.25rem",
      fontWeight: 500,
      letterSpacing: "-0.5px",
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          padding: "8px 24px",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          },
        },
        contained: {
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          "&:hover": {
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          },
        },
        outlined: {
          borderWidth: "2px",
          "&:hover": {
            borderWidth: "2px",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <ScrollToTop />
        <Layout>
          <Box sx={{ mt: 8, p: { xs: 2, sm: 3 } }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/branch-details/:branchId"
                element={<BranchDetails />}
              />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/library" element={<Library />} />
              <Route path="/student-portal" element={<StudentPortal />} />

              {/* Feature Pages */}
              <Route
                path="/features/world-class-education"
                element={<Education />}
              />
              <Route
                path="/features/modern-technology"
                element={<Technology />}
              />
              <Route
                path="/features/global-community"
                element={<Community />}
              />

              {/* Program Pages */}
              <Route path="/programs/cse" element={<ComputerScience />} />
              <Route path="/programs/ece" element={<BusinessManagement />} />
              <Route path="/programs/eee" element={<DigitalArts />} />
              <Route path="/programs/mech" element={<SportsScience />} />
              <Route path="/complaints" element={<Complaint />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Box>
        </Layout>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;
