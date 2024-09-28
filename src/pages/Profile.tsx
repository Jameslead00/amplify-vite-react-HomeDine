import React, { useState, useEffect } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from 'aws-amplify/api';

import { type Schema } from'../../amplify/data/resource.ts';
import { TextField, Button, Box, Typography } from '@mui/material';

const client = generateClient<Schema>();

const Profile: React.FC = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    biography: '',
    location: '',
  });

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    if (user) {
      const { data } = await client.models.Users.list({
        filter: { cognitoId: { eq: user.userId } }
      });
      if (data.length > 0) {
        setUserData(data[0]);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (user) {
      const existingUser = await client.models.Users.list({
        filter: { cognitoId: { eq: user.userId } }
      });
      
      if (existingUser.data.length > 0) {
        await client.models.Users.update({
          id: existingUser.data[0].id,
          ...userData,
          cognitoId: user.userId,
        });
      } else {
        await client.models.Users.create({
          ...userData,
          cognitoId: user.userId,
        });
      }
      alert('Profile updated successfully!');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Edit Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="First Name"
          value={userData.firstName}
          onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Last Name"
          value={userData.lastName}
          onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Biography"
          value={userData.biography}
          onChange={(e) => setUserData({ ...userData, biography: e.target.value })}
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          fullWidth
          label="Location"
          value={userData.location}
          onChange={(e) => setUserData({ ...userData, location: e.target.value })}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Update Profile
        </Button>
      </form>
    </Box>
  );
};

export default Profile;