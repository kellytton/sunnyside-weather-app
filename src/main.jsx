import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { TemperatureUnitProvider } from './hooks/useTemperatureUnit'; // ⬅️ import it

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TemperatureUnitProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </TemperatureUnitProvider>
  </StrictMode>,
)