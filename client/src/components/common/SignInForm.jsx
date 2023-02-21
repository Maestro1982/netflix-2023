import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Button, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import userApi from '../../api/modules/user.api';
import { setIsAuthModalOpen } from '../../redux/features/authModalSlice';
import { setUser } from '../../redux/features/userSlice';

const SignInForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();
  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const signInForm = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, 'Username must be at least 8 characters long')
        .required('Username is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);

      const { response, err } = await userApi.signin(values);
      setIsLoginRequest(false);

      if (response) {
        signInForm.resetForm();
        dispatch(setUser(response));
        dispatch(setIsAuthModalOpen(false));
        toast.success('Sign in success');
      }

      if (err) setErrorMessage(err.message);
    },
  });

  return (
    <Box component='form' onSubmit={signInForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type='text'
          placeholder='username'
          name='username'
          fullWidth
          value={signInForm.values.username}
          onChange={signInForm.handleChange}
          color='success'
          error={
            signInForm.touched.username &&
            signInForm.errors.username !== undefined
          }
          helperText={signInForm.touched.username && signInForm.errors.username}
        />
        <TextField
          type='password'
          placeholder='password'
          name='password'
          fullWidth
          value={signInForm.values.password}
          onChange={signInForm.handleChange}
          color='success'
          error={
            signInForm.touched.password &&
            signInForm.errors.password !== undefined
          }
          helperText={signInForm.touched.password && signInForm.errors.password}
        />
      </Stack>

      <LoadingButton
        type='submit'
        fullWidth
        size='large'
        variant='contained'
        sx={{ marginTop: 4 }}
        loading={isLoginRequest}
      >
        sign in
      </LoadingButton>

      <Button fullWidth sx={{ marginTop: 1 }} onClick={() => switchAuthState()}>
        sign up
      </Button>

      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity='error' variant='outlined'>
            {errorMessage}
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default SignInForm;
