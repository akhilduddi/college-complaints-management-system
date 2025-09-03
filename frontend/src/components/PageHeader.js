import React from 'react';
import { Box, Typography, IconButton, useTheme, alpha } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const PageHeader = ({ title, showBack = true }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        mb: 4,
        p: 2,
        borderRadius: 2,
        backgroundColor: alpha(theme.palette.primary.main, 0.03),
        boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.1)}`,
      }}
    >
      {showBack && (
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
              transform: 'scale(1.1)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          <ArrowBack />
        </IconButton>
      )}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          color: theme.palette.primary.main,
          textShadow: `1px 1px 2px ${alpha(theme.palette.primary.main, 0.1)}`,
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default PageHeader;
