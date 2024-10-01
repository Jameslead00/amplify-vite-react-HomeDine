import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from 'aws-amplify/api';
import { type Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();

const Header: React.FC = () => {
  const { signOut, user } = useAuthenticator((context) => [context.signOut, context.user]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const fetchProfilePicture = async () => {
    if (user) {
      const { data } = await client.models.Users.list({
        filter: { cognitoId: { eq: user.userId } }
      });
      if (data.length > 0 && data[0].profilePictureUrl) {
        setProfilePictureUrl(data[0].profilePictureUrl);
      }
    }
  };

  useEffect(() => {
    fetchProfilePicture();
  }, [user]);

  return (
    <AppBar position="static" sx={{ backgroundColor: '#6337bf' }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Work
        </Typography>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              backgroundColor: '#6337bf',
              color: 'white',
            },
          }}
        >
          <MenuItem onClick={handleMenuClose} component={Link} to="/">Home</MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/about">About</MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/profile">Profile</MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/create-service">Create Service</MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/all-services">All Services</MenuItem>
        </Menu>
        {profilePictureUrl && (
          <Avatar
            src={profilePictureUrl}
            alt="Profile"
            sx={{ width: 40, height: 40, marginRight: 2 }}
          />
        )}
        <Button color="inherit" onClick={signOut}>
          Sign Out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;