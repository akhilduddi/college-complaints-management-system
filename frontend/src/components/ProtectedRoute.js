import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const isAdmin = localStorage.getItem("isAdmin");

    if (token && user) {
      setIsAuthenticated(true);

      // If this is an admin-only route, check if the user is an admin
      if (adminOnly) {
        setIsAuthorized(isAdmin === "true");
      } else {
        setIsAuthorized(true);
      }
    }

    setLoading(false);
  }, [adminOnly]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page
    return (
      <Navigate
        to={adminOnly ? "/admin/login" : "/login"}
        state={{ from: location }}
        replace
      />
    );
  }

  if (!isAuthorized) {
    // User is authenticated but not authorized (not admin for admin-only routes)
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
