import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Container,
  Card,
  CardContent,
  CircularProgress,
  Backdrop,
  Button,
  Paper
} from '@mui/material';
import Joyride from 'react-joyride';
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
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Australia/Sydney',
  });
}

const DashboardGrid = () => {
  const { userData } = useContext(AppContent);
  const { dashboardData, loadDashboardData } = useDashboardDataStore();
  const { forecast, marine, loadForecast, loadMarine } = useWeatherStore();
  const { setLoading } = useLoadingStore();

  const [runTour, setRunTour] = useState(false);
  const [showIntroPrompt, setShowIntroPrompt] = useState(true);

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

  const steps = [
    {
      target: '[data-tour="dive-title"]',
      content: 'Welcome to your dive mission control. This is the name of your next restoration expedition.',
    },
    {
      target: '[data-tour="dive-location"]',
      content: 'This location links directly to your dive site on the map. It’s where your next kelp-saving mission begins.',
    },
    {
      target: '[data-tour="dive-date"]',
      content: 'Here’s when your next dive kicks off. Mark your calendar and prep your gear!',
    },
    {
      target: '[data-tour="forecast-info"]',
      content: 'Knowing the sea’s mood matters. Here you’ll find weather, UV levels, and ocean currents to plan your dive safely.',
    },
    {
      target: '[data-tour="dive-minutes"]',
      content: 'Every minute underwater counts. This tracks your monthly dive effort.',
    },
    {
      target: '[data-tour="kelp-found"]',
      content: 'Keep an eye on discoveries. These are the kelp patches you’ve helped locate this month.',
    },
    {
      target: '[data-tour="kelp-planted"]',
      content: 'New life beneath the waves. This shows the kelp you’ve restored to its home.',
    },
    {
      target: '[data-tour="urchins-removed"]',
      content: 'Urchins can overrun kelp forests. This count tracks your impact in balancing the ecosystem.',
    },
    {
      target: '[data-tour="impact-chart"]',
      content: 'Your ripple effect visualized. This chart shows how your actions add up across time.',
    }
  ];

  return (
    <Box sx={{ bgcolor: '#f5f9ff', minHeight: '100vh', py: 10, position: 'relative' }}>
      {/* Intro Prompt */}
      <Backdrop open={showIntroPrompt} sx={{ zIndex: 1300, backdropFilter: 'blur(6px)' }}>
        <Paper sx={{ p: 4, textAlign: 'center', maxWidth: 500 }}>
          <Typography variant="h5" gutterBottom>
            Welcome to KelpKeepers
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Join us as we walk you through your dashboard — the place where every dive and every action you take
            contributes to restoring Australia’s kelp forests.
          </Typography>
          <Box display="flex" justifyContent="center" gap={2}>
            <Button variant="contained" onClick={() => { setRunTour(true); setShowIntroPrompt(false); }}>
              Let’s begin
            </Button>
            <Button variant="outlined" onClick={() => setShowIntroPrompt(false)}>
              Skip tour
            </Button>
          </Box>
        </Paper>
      </Backdrop>

      <Joyride
        steps={steps}
        run={runTour}
        continuous
        scrollToFirstStep={false}
        scrollToSteps={false}
        disableScrolling
        showProgress
        showSkipButton
        locale={{ last: "I'm ready" }}
        styles={{
          options: {
            zIndex: 1500,
            backgroundColor: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(6px)',
            textColor: '#000',
            primaryColor: '#1976d2',
            overlayColor: 'rgba(0,0,0,0.5)',
          }
        }}
      />

      <Container maxWidth="100%">
        <Grid container spacing={6}>
          <Grid item size={{ xs: 12 }}>
            <DashboardCard title={`Hello ${userData.name}. Your next event:`}>
              {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                  <CircularProgress />
                </Box>
              ) : (
                <Grid container spacing={5}>
                  <Grid item size={{ xs: 12, sm: 6, md: 6 }}>
                    <Typography variant="h3" data-tour="dive-title">Next Dive Event:</Typography>
                    <Typography variant="h5"><strong>{dashboardData.upcomingDive[0].title}</strong></Typography>
                    <Typography variant="subtitle1" data-tour="dive-location">
                      <strong>Location</strong>:
                      <DiveLocationLink
                        name={dashboardData.upcomingDive[0].site_name}
                        latitude={dashboardData.upcomingDive[0].decimalLatitude}
                        longitude={dashboardData.upcomingDive[0].decimalLongitude}
                      />
                    </Typography>
                    <Typography variant="subtitle1" data-tour="dive-date">
                      <strong>Dive Time</strong>: {formatDiveDateTime(dashboardData.upcomingDive[0].date)}
                    </Typography>
                  </Grid>
                  <Grid item sx={{ textAlign: { xs: 'left', md: 'right' } }} size={{ xs: 12, sm: 6, md: 6 }} data-tour="forecast-info">
                    <Typography variant="h3">Forecast</Typography>
                    <Typography variant="subtitle1">{forecast.temperatureMax.value + " " + forecast.temperatureMin.value}</Typography>
                    <Typography variant="subtitle1">UV Index: {forecast.uvIndexMax} Weather: {forecast.weatherCode}</Typography>
                    <Typography variant="subtitle1">Ocean Current Direction: {marine.oceanCurrentDirection.value + ' ' + marine.oceanCurrentDirection.unit}</Typography>
                  </Grid>
                </Grid>
              )}
            </DashboardCard>
          </Grid>

          <Grid item size={{ xs: 12, sm: 6, md: 3 }} data-tour="dive-minutes">
            {isLoading ? <CircularProgressBox /> : <StatCard icon={<AccessTimeIcon color="primary" />} label="Dive Minutes" value={dashboardData.total_minutes_dove} />}
          </Grid>

          <Grid item size={{ xs: 12, sm: 6, md: 3 }} data-tour="kelp-found">
            {isLoading ? <CircularProgressBox /> : <StatCard icon={<NatureIcon color="success" />} label="Kelp Found" value={dashboardData.total_kelp_found} />}
          </Grid>

          <Grid item size={{ xs: 12, sm: 6, md: 3 }} data-tour="kelp-planted">
            {isLoading ? <CircularProgressBox /> : <StatCard icon={<SpaIcon color="info" />} label="Kelp Planted" value={dashboardData.total_kelp_planted} />}
          </Grid>

          <Grid item size={{ xs: 12, sm: 6, md: 3 }} data-tour="urchins-removed">
            {isLoading ? <CircularProgressBox /> : <StatCard icon={<BugReportIcon color="error" />} label="Urchins Removed" value={dashboardData.total_urchins_removed} />}
          </Grid>

          <Grid item size={{ xs: 12 }} data-tour="impact-chart">
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

const StatCard = ({ icon, label, value }) => (
  <Card>
    <CardContent>
      <Box display="flex" alignItems="center">
        {icon}
        <Typography variant="h6" sx={{ ml: 1 }}>{label}</Typography>
      </Box>
      <Typography variant="h4">{value}</Typography>
      <Typography color="textSecondary">This month</Typography>
    </CardContent>
  </Card>
);

const CircularProgressBox = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height="200px">
    <CircularProgress />
  </Box>
);

export default DashboardGrid;
