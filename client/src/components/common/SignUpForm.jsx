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

const SignUpForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();
  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const signUpForm = useFormik({
    initialValues: {
      username: '',
      password: '',
      displayName: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, 'Username must be at least 8 characters long')
        .required('Username is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .required('Password is required'),
      displayName: Yup.string()
        .min(8, 'DisplayName must be at least 8 characters long')
        .required('DisplayName is required'),
      confirmPassword: Yup.string()
        .min(8, 'ConfirmPassword must be at least 8 characters long')
        .required('ConfirmPassword is required'),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);
      const { response, error } = await userApi.signUp(values);
      setIsLoginRequest(false);

      if (response) {
        signUpForm.resetForm();
        dispatch(setUser(response));
        dispatch(setIsAuthModalOpen(false));
        toast.success('User has been signed up successfully');
      }

      if (error) {
        setErrorMessage(error.message);
      }
    },
  });

  return (
    <Box component='form' onSubmit={signUpForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type='text'
          placeholder='Username'
          name='username'
          fullWidth
          value={signUpForm.values.username}
          onChange={signUpForm.handleChange}
          color='success'
          error={
            signUpForm.touched.username &&
            signUpForm.errors.username !== undefined
          }
          helperText={signUpForm.touched.username && signUpForm.errors.username}
        />
        <TextField
          type='text'
          placeholder='Display Name'
          name='displayName'
          fullWidth
          value={signUpForm.values.displayName}
          onChange={signUpForm.handleChange}
          color='success'
          error={
            signUpForm.touched.displayName &&
            signUpForm.errors.displayName !== undefined
          }
          helperText={
            signUpForm.touched.displayName && signUpForm.errors.displayName
          }
        />
        <TextField
          type='password'
          placeholder='Password'
          name='password'
          fullWidth
          value={signUpForm.values.password}
          onChange={signUpForm.handleChange}
          color='success'
          error={
            signUpForm.touched.password &&
            signUpForm.errors.password !== undefined
          }
          helperText={signUpForm.touched.password && signUpForm.errors.password}
        />
        <TextField
          type='password'
          placeholder='Confirm Password'
          name='confirmPassword'
          fullWidth
          value={signUpForm.values.confirmPassword}
          onChange={signUpForm.handleChange}
          color='success'
          error={
            signUpForm.touched.confirmPassword &&
            signUpForm.errors.confirmPassword !== undefined
          }
          helperText={
            signUpForm.touched.confirmPassword &&
            signUpForm.errors.confirmPassword
          }
        />
      </Stack>

      <LoadingButton
        type='submit'
        fullWidth
        size='large'
        variant='contained'
        sx={{
          marginTop: 4,
        }}
        loading={isLoginRequest}
      >
        Sign up
      </LoadingButton>

      <Button
        fullWidth
        sx={{
          marginTop: 1,
        }}
        onClick={() => switchAuthState()}
      >
        Sign in
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

export default SignUpForm;
