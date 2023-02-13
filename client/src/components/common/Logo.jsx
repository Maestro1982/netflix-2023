import React from 'react';
import { Typography, useTheme } from '@mui/material';

const Logo = () => {
  const theme = useTheme();
  return (
    <Typography
      fontWeight='700'
      fontSize='1.7rem'
      style={{ color: theme.palette.primary.main }}
    >
      Netflix
    </Typography>
  );
};

export default Logo;
