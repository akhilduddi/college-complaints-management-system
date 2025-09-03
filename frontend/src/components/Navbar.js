import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Button,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from 'react-router-dom';

const StyledAppBar = styled(AppBar)(({ theme, scrolled }) => ({
  background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
  backdropFilter: scrolled ? 'blur(10px)' : 'none',
  boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none',
  transition: 'all 0.3s ease-in-out',
  position: 'sticky',
  top: 0,
  zIndex: 1100,
}));

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 0',
});

const LogoSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
});

const NavLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '2rem',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const MobileMenu = styled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'flex',
  },
}));

const StyledButton = styled(Button)(({ theme, active }) => ({
  color: active ? '#000' : '#666',
  fontWeight: active ? 600 : 500,
  fontSize: '1rem',
  textTransform: 'none',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    width: active ? '100%' : '0%',
    height: '2px',
    bottom: '-4px',
    left: '0',
    backgroundColor: '#000',
    transition: 'width 0.3s ease-in-out',
  },
  '&:hover': {
    backgroundColor: 'transparent',
    color: '#000',
    '&::after': {
      width: '100%',
    },
  },
}));

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [openAuthDialog, setOpenAuthDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    if (path === '/courses') {
      setSelectedCourse('courses');
      setOpenAuthDialog(true);
    } else {
      navigate(path);
      handleCloseMenu();
    }
  };

  const handleDialogClose = () => {
    setOpenAuthDialog(false);
    setSelectedCourse(null);
  };

  const handleRegisterClick = () => {
    setOpenAuthDialog(false);
    navigate('/register');
  };

  const handleLoginClick = () => {
    setOpenAuthDialog(false);
    navigate('/login');
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Courses', path: '/courses' },
    { label: 'About', path: '/about' },
      
  ];

  return (
    <>
      <StyledAppBar scrolled={scrolled ? 1 : 0}>
        <Container maxWidth="xl">
          <StyledToolbar>
            <LogoSection onClick={() => navigate('/')}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: scrolled ? '#000' : '#fff',
                  transition: 'color 0.3s ease-in-out',
                }}
              >
                React College
              </Typography>
            </LogoSection>

            <NavLinks>
              {navItems.map((item) => (
                <StyledButton
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  active={location.pathname === item.path ? 1 : 0}
                  sx={{
                    color: scrolled ? '#000' : '#fff',
                    '&:hover': {
                      color: scrolled ? '#000' : '#fff',
                    },
                    '&::after': {
                      backgroundColor: scrolled ? '#000' : '#fff',
                    },
                  }}
                >
                  {item.label}
                </StyledButton>
              ))}
            </NavLinks>

            <MobileMenu>
              <IconButton
                onClick={handleOpenMenu}
                sx={{
                  color: scrolled ? '#000' : '#fff',
                }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                PaperProps={{
                  elevation: 3,
                  sx: {
                    mt: 2,
                    borderRadius: '12px',
                    minWidth: '200px',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                  },
                }}
              >
                {navItems.map((item) => (
                  <MenuItem
                    key={item.path}
                    onClick={() => handleNavigate(item.path)}
                    sx={{
                      py: 1.5,
                      px: 3,
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: location.pathname === item.path ? 600 : 400,
                        color: location.pathname === item.path ? '#000' : '#666',
                      }}
                    >
                      {item.label}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </MobileMenu>
          </StyledToolbar>
        </Container>
      </StyledAppBar>

      {/* Authentication Dialog */}
      <Dialog
        open={openAuthDialog}
        onClose={handleDialogClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          elevation: 24,
          sx: {
            borderRadius: '20px',
            padding: '16px',
            backgroundColor: '#ffffff',
          },
        }}
      >
        <DialogTitle 
          sx={{ 
            textAlign: 'center', 
            fontSize: '1.75rem',
            fontWeight: 600,
            color: '#000',
            pt: 3
          }}
        >
          Join Us to View Courses
        </DialogTitle>
        <DialogContent>
          <DialogContentText 
            sx={{ 
              textAlign: 'center', 
              mb: 4,
              color: '#666',
              px: 2
            }}
          >
            Create an account or login to explore our courses and start your learning journey.
          </DialogContentText>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, px: 2 }}>
            <Button
              variant="contained"
              onClick={handleRegisterClick}
              sx={{
                py: 1.5,
                borderRadius: '12px',
                backgroundColor: '#000',
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#333',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                },
              }}
            >
              Register Now
            </Button>
            <Button
              variant="outlined"
              onClick={handleLoginClick}
              sx={{
                py: 1.5,
                borderRadius: '12px',
                borderColor: '#000',
                borderWidth: 2,
                color: '#000',
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  borderColor: '#333',
                  backgroundColor: 'rgba(0,0,0,0.04)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                },
              }}
            >
              Login to Account
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
