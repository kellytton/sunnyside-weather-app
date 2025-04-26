import { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import Forecast from './pages/Forecast';

function App() {
  const [page, setPage] = useState("home");

  return page === "home" ? (
    <Home setPage={setPage} />
  ) : (
    <Forecast setPage={setPage} />
  );
}

export default App;