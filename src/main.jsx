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
      {/* apply MUI to entire app through ThemeProvider*/}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* main app component */}
        <App />
      </ThemeProvider>
    </StrictMode>
  );
}

/* wrap Main in both providers before rendering to ensure any child components
can access theme mode and temperature unit context */
const Root = () => (
  <ThemeModeProvider>
    <TemperatureUnitProvider>
      <Main />
    </TemperatureUnitProvider>
  </ThemeModeProvider>
);

// mount to the DOM
createRoot(document.getElementById('root')).render(<Root/>);