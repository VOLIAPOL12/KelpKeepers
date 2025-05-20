import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, IconButton, Collapse, Box, Chip, Button
} from '@mui/material';
import {
  KeyboardArrowDown as ArrowDownIcon,
  KeyboardArrowUp as ArrowUpIcon,
  Lock as LockIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import useDivingHistoryStore from '../store/useDiveHistoryStore';
import DiveLogDialog from '../components/organisms/DiveLogDialog';

const Row = ({ activity, onNavigate }) => {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <>
      <TableRow hover>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{activity.title}</TableCell>
        <TableCell>{activity.date}</TableCell>
        <TableCell>
          {activity.locked ? <LockIcon fontSize="small" /> : 'Unlocked'}
        </TableCell>
        <TableCell>
          <Chip label="slot" color="success" size="small" />
        </TableCell>
        <TableCell>
          <Button variant="outlined" size="small" onClick={() => onNavigate(`/activity/${activity.event_id}`)}>
            Rate
          </Button>
          <Button
            variant="contained"
            size="small"
            color={activity.resultExists ? 'warning' : 'primary'}
            sx={{ ml: 1 }}
            onClick={() => setDialogOpen(true)}
          >
            {activity.resultExists ? 'Edit Dive Data' : 'Upload Dive Data'}
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={2}>
              <Typography variant="subtitle2">Details</Typography>
              <Typography variant="body2">
                {/* Replace with real activity data */}
                Dive type: {activity.type || 'Cleanup Dive'} <br />
                Instructor: {activity.instructor || 'N/A'} <br />
                Location: {activity.location || 'Not specified'} <br />
                Notes: {activity.notes || 'No additional information provided.'}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <DiveLogDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        eventId={activity.event_id}
        eventTitle={activity.title}
      />
    </>
  );
};

const DivingHistory = () => {
  const {
    diveHistory,
    page,
    limit,
    total,
    loading,
    error,
    loadDiveHistory
  } = useDivingHistoryStore();

  const navigate = useNavigate();


  useEffect(() => {
    loadDiveHistory(page, limit);
  }, [loadDiveHistory, page, limit]);

  const handleBack = () => navigate(-1);
  const handleNavigate = (path) => navigate(path);

  const handlePageChange = (event, newPage) => {
    loadDiveHistory(newPage + 1, limit);
  };

  const handleRowsPerPageChange = (event) => {
    loadDiveHistory(1, parseInt(event.target.value, 10));
  };

  if (loading) return <Typography align="center" sx={{ mt: 5 }}>Loading...</Typography>;
  if (error) return <Typography align="center" color="error" sx={{ mt: 5 }}>{error}</Typography>;

  return (
    <Box sx={{ maxWidth: '1000px', mx: 'auto', mt: 4, px: 2, py: 10 }}>
      <Button variant="contained" onClick={handleBack} sx={{ mb: 2 }}>
        ← Back
      </Button>

      <Typography variant="h4" align="center" gutterBottom>
        Your Diving History
      </Typography>

      {diveHistory.length === 0 ? (
        <Typography align="center" color="text.secondary">
          No diving history found.
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell><strong>Title</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Slot</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {diveHistory.map((activity) => (
                <Row key={activity.event_id} activity={activity} onNavigate={handleNavigate} />
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={total}
            page={page - 1}
            onPageChange={handlePageChange}
            rowsPerPage={limit}
            onRowsPerPageChange={handleRowsPerPageChange}
            rowsPerPageOptions={[5, 10, 20]}
          />
        </TableContainer>
      )}
    </Box>
  );
};

export default DivingHistory;
