import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      {/* Global loading */}
      {/* Global loading */}

      {/* Login modal */}
      {/* Login modal */}

      <Box display='flex' minHeight='100vh'>
        {/* Header */}
        {/* Header */}

        {/* Main */}
        <Box component='main' flexGrow={1} overflow='hidden' minHeight='100vh'>
          <Outlet />
        </Box>
        {/* Main */}
      </Box>

      {/* Footer */}
      {/* Footer */}
    </>
  );
};

export default MainLayout;
