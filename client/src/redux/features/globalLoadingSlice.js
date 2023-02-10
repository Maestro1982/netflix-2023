import { createSlice } from '@reduxjs/toolkit';

export const globalLoadingSlice = createSlice({
  name: 'globalLoading',
  initialState: {
    isGlobalLoading: false,
  },
  reducers: {
    setIsGlobalLoading: (state, action) => {
      state.isGlobalLoading = action.payload;
    },
  },
});

export const { setIsGlobalLoading } = globalLoadingSlice.actions;

export default globalLoadingSlice.reducer;
