import React from 'react';
import { Box, Fab, Zoom, useTheme, alpha } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';

const BackToTop = () => {
  const theme = useTheme();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        zIndex: 1000
      }}
    >
      <Zoom in>
        <Fab
          color="primary"
          aria-label="scroll back to top"
          onClick={scrollToTop}
          sx={{
            boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.2)}`,
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: `0 12px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
            },
            transition: 'all 0.3s ease'
          }}
        >
          <KeyboardArrowUp />
        </Fab>
      </Zoom>
    </Box>
  );
};

export default BackToTop;
