import { createSlice } from '@reduxjs/toolkit';

export const authModalSlice = createSlice({
  name: 'authModal',
  initialState: {
    isAuthModalOpen: false,
  },
  reducers: {
    setIsAuthModal: (state, action) => {
      state.isAuthModalOpen = action.payload;
    },
  },
});

export const { setIsAuthModal } = authModalSlice.actions;

export default authModalSlice.reducer;
