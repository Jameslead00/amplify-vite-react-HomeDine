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
    biography: '',
    location: '',
  });
  const [isEditing, setIsEditing] = useState(false);

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
              setUserData({
                firstName: data[0].firstName || '',
                lastName: data[0].lastName || '',
                biography: data[0].biography || '',
                location: data[0].location || '',
              });
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
      <Typography variant="h4" gutterBottom>User Profile</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="First Name"
          value={userData.firstName}
          onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
          margin="normal"
          disabled={!isEditing}
        />
        <TextField
          fullWidth
          label="Last Name"
          value={userData.lastName}
          onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
          margin="normal"
          disabled={!isEditing}
        />
        <TextField
          fullWidth
          label="Biography"
          value={userData.biography}
          onChange={(e) => setUserData({ ...userData, biography: e.target.value })}
          margin="normal"
          multiline
          rows={4}
          disabled={!isEditing}
        />
        <TextField
          fullWidth
          label="Location"
          value={userData.location}
          onChange={(e) => setUserData({ ...userData, location: e.target.value })}
          margin="normal"
          disabled={!isEditing}
        />
        {isEditing ? (
          <>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, mr: 1 }}>
              Save Changes
            </Button>
            <Button onClick={() => setIsEditing(false)} variant="outlined" sx={{ mt: 2 }}>
              Cancel
            </Button>
          </>
        ) : (
          <Button onClick={() => setIsEditing(true)} variant="contained" color="primary" sx={{ mt: 2 }}>
            Edit Profile
          </Button>
        )}
      </form>
    </Box>
  );
};

export default Profile;