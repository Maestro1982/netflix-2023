import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../common/Footer';
import GlobalLoading from '../common/GlobalLoading';
import Topbar from '../common/Topbar';
import AuthModal from '../common/AuthModal';

const MainLayout = () => {
  return (
    <>
      {/* Global loading */}
      <GlobalLoading />
      {/* Global loading */}

      {/* Login modal */}
      <AuthModal />
      {/* Login modal */}

      <Box display='flex' minHeight='100vh'>
        {/* Header */}
        <Topbar />
        {/* Header */}

        {/* Main */}
        <Box component='main' flexGrow={1} overflow='hidden' minHeight='100vh'>
          <Outlet />
        </Box>
        {/* Main */}
      </Box>

      {/* Footer */}
      <Footer />
      {/* Footer */}
    </>
  );
};

export default MainLayout;
