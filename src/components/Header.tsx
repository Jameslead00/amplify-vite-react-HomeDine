import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';

const Header: React.FC = () => {
  const { signOut } = useAuthenticator((context) => [context.signOut]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Your App Name
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
          <Button color="inherit" component={Link} to="/profile">
            Profile
          </Button>
          <Button color="inherit" onClick={signOut}>
            Sign Out
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;