import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Box, Container, ThemeProvider, Typography, createTheme } from '@mui/material';
import SignIn from './pages/auth/SignIn';
import SideBar from './components/globals/SideBar';
import Feed from './pages/feed/Feed';
import { ThemeContext } from '@emotion/react';
import SearchBar from './components/globals/SearchBar';
import { Provider } from 'react-redux';
import store from './redux/store';
import { SocketProvider } from './globals/SocketProvider';
import SplashScreen from './pages/auth/SplashScreen';

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
        }
      }
    }
  )
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SocketProvider>
        <Router>
        <Box sx={{
            display: "flex",
            flex: 1,
            height: "100vh",
            width: "100vw"
          }}>
       
            <SideBar />
            {/* <SplashScreen/> */}
            <Feed />

            <SearchBar />
          </Box>
        </Router>
        </SocketProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
