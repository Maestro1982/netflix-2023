import { createSlice } from '@reduxjs/toolkit';

export const authModalSlice = createSlice({
  name: 'authModal',
  initialState: {
    isAuthModalOpen: false,
  },
  reducers: {
    setIsAuthModalOpen: (state, action) => {
      state.isAuthModalOpen = action.payload;
    },
  },
});

export const { setIsAuthModalOpen } = authModalSlice.actions;

export default authModalSlice.reducer;
