import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
  Button,
  Divider,
  Fade,
  Container,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  Book as BookIcon,
  Home as HomeIcon,
  ChevronLeft as ChevronLeftIcon,
  Close as CloseIcon,
  AdminPanelSettings as AdminIcon,
  Report as ReportIcon,
} from "@mui/icons-material";
import PageWrapper from "../PageWrapper/PageWrapper";

const drawerWidth = 280;

const menuItems = [
  { text: "Home", path: "/", icon: <HomeIcon /> },
  { text: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
  { text: "Students", path: "/students", icon: <SchoolIcon /> },
  { text: "Teachers", path: "/teachers", icon: <PersonIcon /> },
  { text: "Courses", path: "/courses", icon: <BookIcon /> },
];

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [baseUrl] = React.useState("http://localhost:7800"); // Store the base URL

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  // Function to handle direct external links
  const handleExternalLink = (url) => {
    window.open(url, "_blank");
  };

  const getPageType = () => {
    const path = location.pathname;
    if (path === "/") return "home";
    if (path === "/login") return "login";
    if (path.includes("/courses")) return "courses";
    if (path.includes("/branch-details")) return "branch";
    if (path === "/dashboard") return "default";
    return "default";
  };

  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 600,
            color: "primary.main",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <SchoolIcon /> College Management
        </Typography>
        <IconButton onClick={handleDrawerToggle} sx={{ color: "primary.main" }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <List sx={{ flex: 1, px: 2 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem
              button
              key={item.text}
              onClick={() => handleNavigation(item.path)}
              selected={isActive}
              sx={{
                borderRadius: 2,
                mb: 1,
                transition: "all 0.2s ease-in-out",
                "&.Mui-selected": {
                  backgroundColor: "primary.light",
                  "&:hover": {
                    backgroundColor: "primary.light",
                  },
                  "& .MuiListItemIcon-root": {
                    color: "primary.main",
                  },
                  "& .MuiListItemText-primary": {
                    color: "primary.main",
                    fontWeight: 600,
                  },
                },
                "&:hover": {
                  backgroundColor: "action.hover",
                  transform: "translateX(8px)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: isActive ? "primary.main" : "text.secondary",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "primary.main" : "text.primary",
                }}
              />
            </ListItem>
          );
        })}

        {/* Admin Dashboard Link */}
        {localStorage.getItem("isAdmin") === "true" && (
          <>
            <Divider sx={{ my: 2 }} />
            <ListItem
              button
              onClick={() => handleNavigation("/admin/dashboard")}
              selected={location.pathname === "/admin/dashboard"}
              sx={{
                borderRadius: 2,
                mb: 1,
                backgroundColor: theme.palette.secondary.main,
                color: "white",
                "&:hover": {
                  backgroundColor: theme.palette.secondary.dark,
                  transform: "translateX(8px)",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: "white" }}>
                <AdminIcon />
              </ListItemIcon>
              <ListItemText
                primary="Admin Dashboard"
                primaryTypographyProps={{
                  fontWeight: 600,
                  color: "white",
                }}
              />
            </ListItem>
          </>
        )}
      </List>
      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          fullWidth
          sx={{
            py: 1,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
          onClick={() => handleNavigation("/dashboard")}
        >
          Go to Dashboard
        </Button>
      </Box>
    </Box>
  );

  return (
    <PageWrapper page={getPageType()}>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: "100%",
            backgroundColor: "background.paper",
            boxShadow: "none",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                color: "text.primary",
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                color: "text.primary",
                fontWeight: 600,
                flexGrow: 1,
              }}
            >
              {menuItems.find((item) => item.path === location.pathname)
                ?.text || "College Management"}
            </Typography>

            {/* Admin Login Link - Always visible */}
            <Button
              color="secondary"
              variant={
                localStorage.getItem("isAdmin") === "true"
                  ? "contained"
                  : "outlined"
              }
              startIcon={<AdminIcon />}
              onClick={() =>
                handleNavigation(
                  localStorage.getItem("isAdmin") === "true"
                    ? "/admin/dashboard"
                    : "/admin/login"
                )
              }
              sx={{
                ml: 2,
                textTransform: "none",
                fontWeight: 500,
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                },
              }}
            >
              {localStorage.getItem("isAdmin") === "true"
                ? "Admin Dashboard"
                : "Admin Login"}
            </Button>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              backgroundColor: "background.paper",
              backgroundImage: "none",
              boxShadow: "none",
              border: "none",
            },
          }}
        >
          {drawer}
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, width: "100%" }}>
          <Toolbar />
          <Fade in={true} timeout={500}>
            <Container maxWidth="lg" sx={{ p: 3 }}>
              {children}
            </Container>
          </Fade>
        </Box>
      </Box>
    </PageWrapper>
  );
};

export default Layout;
