import logo from './logo.svg';
import './App.css';
import {Navbar} from './components/Navbar/Navbar';
import { ThemeProvider } from '@emotion/react';
import { lightTheme } from './Theme/LightTheme';
import { CssBaseline } from '@mui/material';
import Home from './components/Home';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline/>
   <Navbar/>
<Home/>

    </ThemeProvider>
  );
}

export default App;
