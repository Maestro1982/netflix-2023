import { ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import themeConfigs from './configs/theme.configs.js';
import { ToastContainer } from 'react-toastify';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  const { themeMode } = useSelector((state) => state.themeMode);
  return (
    <ThemeProvider theme={themeConfigs.custom({ mode: themeMode })}>
      {/* Config toastify */}
      <ToastContainer
        position='bottom-left'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme={themeMode}
      />
      {/* Mui reset CSS */}
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
