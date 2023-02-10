import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../redux/features/userSlice.js';

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default store;
