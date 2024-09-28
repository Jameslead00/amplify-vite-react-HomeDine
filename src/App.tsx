/**
 * The main React component that serves as the entry point for the application.
 * It sets up the routing and layout for the application, rendering the appropriate
 * pages based on the current URL path.
 */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'

import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import CreateService from './pages/CreateService';

/**
 * Defines the theme configuration for the application, including the primary and secondary color palettes,
 * as well as the default background color and font family.
 * This theme is used to style the components throughout the application.
 */
const theme = createTheme({
  palette: {
    primary: {
      main: '#6337bf',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
  },
});
    const App: React.FC = () => {
      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <Authenticator>
              {() => (
              <Router>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/create-service" element={<CreateService />} />
                  </Routes>
                </Layout>
              </Router>
            )}
          </Authenticator>
    </ThemeProvider>
  );
}; 


export default App;
