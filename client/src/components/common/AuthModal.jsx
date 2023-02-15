import React, { useEffect, useState } from 'react';
import { Box, Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuthModalOpen } from '../../redux/features/authModalSlice';
import Logo from './Logo';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const actionState = {
  signIn: 'signIn',
  signUp: 'signUp',
};

const AuthModal = () => {
  const { isAuthModalOpen } = useSelector((state) => state.authModal);
  const dispatch = useDispatch();

  const [action, setAction] = useState(actionState.signIn);

  useEffect(() => {
    if (isAuthModalOpen) {
      setAction(actionState.signIn);
    }
  }, [isAuthModalOpen]);

  const handleCloseModal = () => dispatch(setIsAuthModalOpen(false));

  const switchAuthState = (state) => setAction(state);

  return (
    <Modal open={isAuthModalOpen} onClose={handleCloseModal}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: '600px',
          padding: 4,
          outline: 'none',
        }}
      >
        <Box
          sx={{
            padding: 4,
            boxShadow: 24,
            backgroundColor: 'background.paper',
          }}
        >
          <Box sx={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Logo />
          </Box>

          {action === actionState.signIn && (
            <SignInForm
              switchAuthState={() => switchAuthState(actionState.signUp)}
            />
          )}

          {action === actionState.signUp && (
            <SignUpForm
              switchAuthState={() => switchAuthState(actionState.signIn)}
            />
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default AuthModal;
