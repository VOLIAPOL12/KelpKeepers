import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Container,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import DashboardCard from '../components/molecules/DashboardCard';

const DashboardGrid = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  
  return (
    <Box sx={{ bgcolor: '#f5f9ff', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="xl">
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Kelp Restoration Hub
        </Typography>

        <Grid container spacing={3}>
          <Grid item size={{xs:12, sm:6, md:4}}>
            <DashboardCard title="Next Dive">
              <Typography>Today's weather</Typography>
              <Typography variant="caption">Eddystone Point</Typography>
            </DashboardCard>
          </Grid>

          <Grid item size={{xs:12, sm:6, md:4}}>
            <DashboardCard title="My Dives" bgcolor="#e0f7fa">
              <Typography>Total: 12 dives</Typography>
              <Typography variant="caption">Last: 14 May 2025</Typography>
            </DashboardCard>
          </Grid>

          <Grid item size={{xs:12, sm:6, md:4}}>
            <DashboardCard title="Leaderboard" bgcolor="#ede7f6">
              <Typography>#5 - You</Typography>
              <Typography>#1 - Alice</Typography>
              <Typography>#2 - Bob</Typography>
            </DashboardCard>
          </Grid>

          <Grid item size={{xs:12, sm:6, md:4}}>
            <DashboardCard title="Create Activity" bgcolor="#fbe9e7">
              <Typography>Plan your next dive mission</Typography>
            </DashboardCard>
          </Grid>

          <Grid item size={{xs:12, sm:6, md:4}}>
            <DashboardCard title="Recent Activity" bgcolor="#e8f5e9">
              <Typography>Joined: Kelp Sweep 12 May</Typography>
              <Typography>Created: Sea Dive 8 May</Typography>
            </DashboardCard>
          </Grid>

          <Grid item size={{xs:12, sm:6, md:4}}>
            <DashboardCard title="My Impact" bgcolor="#fff8e1">
              <Typography>124 sea urchins removed</Typography>
              <Typography>6 kelp patches restored</Typography>
            </DashboardCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DashboardGrid;
