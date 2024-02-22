import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, Container, ThemeProvider, Typography, createTheme } from '@mui/material';
import { Provider, useSelector } from 'react-redux';
import store, { RootState } from './redux/store';
import { SocketProvider } from './globals/SocketProvider';
import MainRoute from './routes/MainRoutes';
import { ThemeContextProvider } from './globals/ThemeContext';

function App() {
  const theme = createTheme(
    {
      palette: {
        primary: {
          main: "#000"
        },
        secondary: {
          main: '#cccccc'
        },
        background: {
          default: "white"
        },
        text:{
          primary:"#000"
        }
      }
    }
  )
  return (
    <Provider store={store}>
      <ThemeContextProvider>
      <SocketProvider>
        <MainRoute/>
        </SocketProvider>
      </ThemeContextProvider>
    </Provider>
  );
}

export default App;
