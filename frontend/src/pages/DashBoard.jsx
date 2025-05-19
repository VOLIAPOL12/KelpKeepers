import React, { useContext, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Container,
  CircularProgress,
  useTheme,
} from '@mui/material';
import DashboardCard from '../components/molecules/DashboardCard';
import useDashboardDataStore from '../store/useDashbaordDataStore';
import useWeatherStore from '../store/useWeatherStore';
import useLoadingStore from '../store/useLoadingStore';
import DiveLocationLink from '../components/atoms/DiveLocationLink';
import { AppContent } from '../context/AppContext';

function formatDiveDateTime(isoString) {
  const date = new Date(isoString);

  return date.toLocaleString('en-AU', {
    weekday: 'short',    // "Sun"
    day: 'numeric',      // "18"
    month: 'short',      // "May"
    hour: 'numeric',     // "3"
    minute: '2-digit',   // "03"
    hour12: true,        // "AM/PM"
    timeZone: 'Australia/Sydney',
  });
}

const DashboardGrid = () => {
  const { userData } = useContext(AppContent);
  const {dashboardData, loadDashboardData } = useDashboardDataStore();
  const {forecast, marine, loadForecast, loadMarine} = useWeatherStore();
  const { setLoading } = useLoadingStore();


  useEffect(() => {
    setLoading(true);
    loadDashboardData().finally(() => {
      setLoading(false);
    });
  }, []);
  
  useEffect(() => {
    const dive = dashboardData?.upcomingDive?.[0];
    if (dive) {
      loadForecast(dive.decimalLatitude, dive.decimalLongitude, dive);
      loadMarine(dive.decimalLatitude, dive.decimalLongitude, dive);
    }
  }, [dashboardData]);
  const isLoading = !dashboardData || !forecast || !marine;

  const theme = useTheme();

  return (
    <Box sx={{ bgcolor: '#f5f9ff', minHeight: '100vh', py: 10 }}>
      <Container maxWidth="100%">


        <Grid container spacing={3}>
          <Grid item size={{xs:12, sm:12, md:12}}>
            <DashboardCard title={"Hello " + userData.name + ". Your next event:"}>
              {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                  <CircularProgress />
                </Box>
              ) : (
              <Grid container spacing={5}>
                <Grid item size={{xs: 12, sm: 6, md: 6}}>
                  <Typography variant="h3">Next Dive Event:</Typography>
                  <Typography variant="h5"><strong>{dashboardData.upcomingDive[0].title}</strong></Typography>
                  <Typography variant="subtitle1">
                    <strong>Location</strong>:
                    <DiveLocationLink
                      name={dashboardData.upcomingDive[0].site_name}
                      latitude={dashboardData.upcomingDive[0].decimalLatitude}
                      longitude={dashboardData.upcomingDive[0].decimalLongitude}
                    />
                    </Typography>
                  <Typography variant="subtitle1">
                    <strong>Dive Time</strong>: {formatDiveDateTime(dashboardData.upcomingDive[0].date)}
                  </Typography>
                </Grid>
                <Grid item sx={{textAlign: {xs: 'left', md: 'right'}}} size={{xs: 12, sm: 6, md: 6}}>
                  <Typography variant="h3">Forecast</Typography>
                  <Typography variant="subtitle1">{forecast.temperatureMax.value + " " + forecast.temperatureMin.value}</Typography>
                  <Typography variant="subtitle1">UV Index: {forecast.uvIndexMax} Weather: {forecast.weatherCode}</Typography>
                  <Typography variant="subtitle1">Ocean Current Direction: {marine.oceanCurrentDirection.value + ' ' + marine.oceanCurrentDirection.unit}</Typography>
                  <Typography variant="subtitle1"></Typography>
                </Grid>
              </Grid>
              )}
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
