import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../redux/features/userSlice.js';
import appStateSlice from './features/appStateSlice.js';
import authModalSlice from './features/authModalSlice.js';
import globalLoadingSlice from './features/globalLoadingSlice.js';
import themeModeSlice from './features/themeModeSlice.js';

const store = configureStore({
  reducer: {
    user: userSlice,
    themeMode: themeModeSlice,
    authModal: authModalSlice,
    appState: appStateSlice,
    globalLoading: globalLoadingSlice,
  },
});

export default store;
