import React, { useState, useEffect } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from 'aws-amplify/api';
import { uploadData } from 'aws-amplify/storage';
import { v4 as uuidv4 } from 'uuid';
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
    profilePictureUrl: '',
  });
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
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
                profilePictureUrl: data[0].profilePictureUrl || '',
              });
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePicture(event.target.files[0]);
    }
  };
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (user && profilePicture) {
      const fileName = `${uuidv4()}-${profilePicture.name}`;
      try {
        const result = await uploadData({
          key: `profile-pictures/${user.userId}/${fileName}`,
          data: profilePicture,
          options: {
            contentType: profilePicture.type,
          },
        }).result;
        console.log('Upload success:', result);
      
        // Update user data with profile picture URL
        const updatedUserData = {
          ...userData,
          profilePictureUrl: `profile-pictures/${user.userId}/${fileName}`,
        };
      
        // Update or create user data in the database
        const existingUser = await client.models.Users.list({
          filter: { cognitoId: { eq: user.userId } }
        });
      
        if (existingUser.data.length > 0) {
          await client.models.Users.update({
            id: existingUser.data[0].id,
            ...updatedUserData,
            cognitoId: user.userId,
          });
        } else {
          await client.models.Users.create({
            ...updatedUserData,
            cognitoId: user.userId,
          });
        }
      
        alert('Profile updated successfully!');
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Error uploading profile picture');
      }
    }
  };


  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom>User Profile</Typography>
      <form onSubmit={handleSubmit}>
        <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={!isEditing}
        />
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
