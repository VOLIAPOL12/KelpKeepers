import React, { useContext, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Container,
  Card,
  CardContent,
  CircularProgress,
  useTheme,
} from '@mui/material';
import DashboardCard from '../components/molecules/DashboardCard';
import useDashboardDataStore from '../store/useDashbaordDataStore';
import useWeatherStore from '../store/useWeatherStore';
import useLoadingStore from '../store/useLoadingStore';
import DiveLocationLink from '../components/atoms/DiveLocationLink';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NatureIcon from '@mui/icons-material/Nature';
import SpaIcon from '@mui/icons-material/Spa';
import BugReportIcon from '@mui/icons-material/BugReport';
import { AppContent } from '../context/AppContext';
import DiveSummaryChart from '../components/molecules/DiveSummaryChart';

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

        <Grid container spacing={6}>
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

          <Grid item size={{xs:12, sm:6, md:3}}>
            {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                  <CircularProgress />
                </Box>
              ) : (
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <AccessTimeIcon color="primary" sx={{ fontSize: 32, mr: 1 }} />
                  <Typography variant="h6">Dive Minutes</Typography>
                </Box>
                <Typography variant="h4">{dashboardData.total_minutes_dove}</Typography>
                <Typography color="textSecondary">This month</Typography>
              </CardContent>
            </Card>
              )}
          </Grid>

          <Grid item size={{xs:12, sm:6, md:3}}>
            {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                  <CircularProgress />
                </Box>
              ) : (
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <NatureIcon color="success" sx={{ fontSize: 32, mr: 1 }} />
                  <Typography variant="h6">Kelp Found</Typography>
                </Box>
                <Typography variant="h4">{dashboardData.total_kelp_found}</Typography>
                <Typography color="textSecondary">This month</Typography>
              </CardContent>
            </Card>
              )}
          </Grid>

          <Grid item size={{xs:12, sm:6, md:3}}>
            {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                  <CircularProgress />
                </Box>
              ) : (
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <SpaIcon color="info" sx={{ fontSize: 32, mr: 1 }} />
                  <Typography variant="h6">Kelp Planted</Typography>
                </Box>
                <Typography variant="h4">{dashboardData.total_kelp_planted}</Typography>
                <Typography color="textSecondary">This month</Typography>
              </CardContent>
            </Card>
              )}
          </Grid>

          <Grid item size={{xs:12, sm:6, md:3}}>
            {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                  <CircularProgress />
                </Box>
              ) : (
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <BugReportIcon color="error" sx={{ fontSize: 32, mr: 1 }} />
                  <Typography variant="h6">Urchins Removed</Typography>
                </Box>
                <Typography variant="h4">{dashboardData.total_urchins_removed}</Typography>
                <Typography color="textSecondary">This month</Typography>
              </CardContent>
            </Card>
              )}
          </Grid>
          <Grid item size={{xs:12, sm:12, md:12}}>
            {isLoading ? (
              <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                <CircularProgress />
              </Box>
            ) : (
              <DashboardCard>
                <DiveSummaryChart data={dashboardData.global_data} />
              </DashboardCard>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DashboardGrid;
