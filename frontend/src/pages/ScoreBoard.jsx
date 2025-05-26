import React, { useEffect } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Alert,
  Chip
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import useScoreboardStore from '../store/useScoreboardStore';
import { deepPurple, amber, grey, orange } from '@mui/material/colors';

const getMedal = (rank) => {
  const commonStyle = { mr: 1, verticalAlign: 'middle' };
  switch (rank) {
    case '1':
      return <EmojiEventsIcon sx={{ ...commonStyle, color: amber[500] }} />;
    case '2':
      return <EmojiEventsIcon sx={{ ...commonStyle, color: grey[500] }} />;
    case '3':
      return <EmojiEventsIcon sx={{ ...commonStyle, color: orange[400] }} />;
    default:
      return null;
  }
};

export default function Scoreboard() {
  const { top10, currentUser, loading, error, fetchLeaderboard } = useScoreboardStore();

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 6 }}>
      <Card elevation={6} sx={{ background: 'linear-gradient(to bottom right, #e0f7fa, #ffffff)', borderRadius: 4 }}>
        <CardContent>
          <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
            🌊 KelpKeeper Leaderboard
          </Typography>

          {loading && (
            <Box display="flex" justifyContent="center" mt={4}>
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ my: 4 }}>
              {error}
            </Alert>
          )}

          {!loading && !error && (
            <>
              <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                <Table>
                  <TableHead sx={{ backgroundColor: '#004d40' }}>
                    <TableRow>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Rank</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Score</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {top10.map((user, idx) => (
                      <TableRow
                        key={user.user_id}
                        hover
                        sx={{
                          transition: 'all 0.2s ease-in-out',
                          '&:hover': {
                            transform: 'scale(1.01)',
                            boxShadow: 3,
                          }
                        }}
                      >
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            {getMedal(user.rank)}
                            <Typography fontWeight="bold">#{user.rank}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={2}>
                            <Avatar sx={{ bgcolor: deepPurple[500] }}>
                              {user.name[0].toUpperCase()}
                            </Avatar>
                            <Typography>{user.name}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={user.total_score}
                            color="primary"
                            sx={{ fontWeight: 'bold', fontSize: '1rem' }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {currentUser && (
                <Box mt={4} p={3} borderRadius={3} bgcolor="#e3f2fd" boxShadow={2}>
                  <Typography align="center" fontSize="1.1rem">
                    👤 You are currently ranked <strong>#{currentUser.rank}</strong> with a score of <strong>{currentUser.total_score}</strong>.
                  </Typography>
                </Box>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
