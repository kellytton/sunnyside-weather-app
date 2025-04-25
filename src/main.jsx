import { useMemo, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import getDesignTokens from './theme';
import { TemperatureUnitProvider } from './hooks/useTemperatureUnit';
import { ThemeModeProvider, useThemeMode } from './hooks/useThemeMode';

function InnerApp() {
  const { mode, toggleMode } = useThemeMode();
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App toggleMode={toggleMode} />
    </ThemeProvider>
  );
}

function Main() {
  return (
    <StrictMode>
      <ThemeModeProvider>
        <TemperatureUnitProvider>
          <InnerApp />
        </TemperatureUnitProvider>
      </ThemeModeProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<Main />);