import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';

const teamMembers = [
  {
    name: 'Drini',
    role: 'Co-Founder',
    description: 'Bla bla bla bla bla bla bla bla bla bla',
  },
  {
    name: 'Dave',
    role: 'Co-Founder',
    description: 'Blu blu blu blu blu blu blu blu blu blu',
  },
  {
    name: 'James',
    role: 'CTO',
    description: 'Blo blo blo blo blo blo blo blo blo blo',
  },
];

const About: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        Our Team
      </Typography>
      <Grid container spacing={3}>
        {teamMembers.map((member, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              backgroundColor: 'primary.main', 
              color: 'white', 
              borderRadius: 4,
              boxShadow: 'none'
            }}>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  {member.name}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {member.role}
                </Typography>
                <Typography variant="body2">
                  {member.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default About;