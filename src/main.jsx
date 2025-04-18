import { useMemo, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import getDesignTokens from './theme';
import { TemperatureUnitProvider } from './hooks/useTemperatureUnit';
import { useState } from 'react';

function Main() {
  const [mode, setMode] = useState('light');

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <TemperatureUnitProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App toggleMode={() => setMode((prev) => (prev === 'light' ? 'dark' : 'light'))} />
      </ThemeProvider>
    </TemperatureUnitProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Main />
  </StrictMode>
);