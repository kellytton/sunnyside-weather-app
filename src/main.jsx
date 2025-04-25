import { StrictMode, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import getDesignTokens from './theme';

import { TemperatureUnitProvider } from './hooks/useTemperatureUnit';
import { ThemeModeProvider, useThemeMode } from './hooks/useThemeMode';

// app-specific logic (creating themes or managing layout logic)
function Main() {
  const { mode } = useThemeMode();
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StrictMode>
  );
}

// wrap Main in both providers before rendering
const Root = () => (
  <ThemeModeProvider>
    <TemperatureUnitProvider>
      <Main />
    </TemperatureUnitProvider>
  </ThemeModeProvider>
);

createRoot(document.getElementById('root')).render(<Root/>);