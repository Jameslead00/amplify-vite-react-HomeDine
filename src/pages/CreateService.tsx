/*import React, { useState } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from 'aws-amplify/api';
import { type Schema } from '../../amplify/data/resource.ts';
import { TextField, Button, Box, Typography, MenuItem, InputAdornment } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const client = generateClient<Schema>();

const categories = ['Location-based', 'Remote', 'One-Time', 'Recurring'];

const CreateService: React.FC = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const theme = useTheme();
  const [serviceData, setServiceData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (user) {
      try {
        await client.models.Services.create({
          ...serviceData,
          price: parseFloat(serviceData.price),
          owner: user.userId
        });
        alert('Service created successfully!');
        // Reset form or redirect
      } catch (error) {
        console.error('Error creating service:', error);
        alert('Failed to create service. Please try again.');
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom>Create New Service</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          value={serviceData.title}
          onChange={(e) => setServiceData({ ...serviceData, title: e.target.value })}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Description"
          value={serviceData.description}
          onChange={(e) => setServiceData({ ...serviceData, description: e.target.value })}
          margin="normal"
          multiline
          rows={4}
          required
        />
        <TextField
          fullWidth
          select
          label="Category"
          value={serviceData.category}
          onChange={(e) => setServiceData({ ...serviceData, category: e.target.value })}
          margin="normal"
          required
          SelectProps={{
            MenuProps: {
              PaperProps: {
                sx: {
                  backgroundColor: theme.palette.primary.main,
                  '& .MuiMenuItem-root': {
                    color: 'white',
                  },
                },
              },
            },
          }}
        >
          {categories.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          label="Price"
          type="number"
          value={serviceData.price}
          onChange={(e) => {
            const value = e.target.value;
            if (value === '' || parseFloat(value) >= 0) {
              setServiceData({ ...serviceData, price: value });
            }
          }}
          margin="normal"
          required
          InputProps={{
            startAdornment: <InputAdornment position="start">CHF</InputAdornment>,
            inputProps: { min: 0, step: 'any' }
          }}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Create Service
        </Button>
      </form>
    </Box>
  );
};

export default CreateService;
*/