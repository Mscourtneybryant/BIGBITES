import './App.css';
import {Navbar} from './components/Navbar/Navbar';
import { ThemeProvider } from '@emotion/react';
import { darkTheme } from './Theme/darkTheme';
import { CssBaseline } from '@mui/material';
import Home from './components/Home';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
   <Navbar/>
<Home/>

    </ThemeProvider>
  );
}

export default App;
