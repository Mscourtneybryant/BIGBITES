import logo from './logo.svg';
import './App.css';
import {Navbar} from './components/Navbar/Navbar';
import { ThemeProvider } from '@emotion/react';
import { darkTheme } from './Theme/DarkTheme';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
   <Navbar/>

    </ThemeProvider>
  );
}

export default App;
