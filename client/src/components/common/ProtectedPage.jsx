import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuthModalOpen } from '../../redux/features/authModalSlice';

const ProtectedPage = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(setIsAuthModalOpen(!user));
  }, [user, dispatch]);
  return user ? children : 'null';
};

export default ProtectedPage;
