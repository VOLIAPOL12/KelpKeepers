import React, { useContext, useState, useEffect } from 'react';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Typography
} from '@mui/material';

const DiveLobby = () => {
  const { backendUri, userData, isLoggedIn, getUserData } = useContext(AppContent);
  const [activities, setActivities] = useState([]);
  const [joinedActivityId, setJoinedActivityId] = useState(null);
  const [userStatus, setUserStatus] = useState(false);

  // 获取用户状态
  const fetchUserStatus = async () => {
    try {
      const res = await axios.get(`${backendUri}/api/user/data`);
      console.log('Fetched user data:', res.data); // 打印返回的数据结构
      console.log('Fetched user status:', res.data.userData?.user_status); // 打印用户状态
      setUserStatus(res.data.userData?.user_status || false);
      setJoinedActivityId(res.data.userData?.joined_event_id || null);
    } catch (err) {
      toast.error('Failed to get user status');
    }
  };

  // 获取活动信息
  const fetchActivities = async () => {
    try {
      const res = await axios.get(`${backendUri}/api/diving-activities`);
      const all = res.data;

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      const filtered = all.filter((activity) => {
        const date = new Date(activity.date);
        return date >= tomorrow && activity.slots_now < activity.max_slots;
      });

      setActivities(filtered);
    } catch (err) {
      toast.error('Failed to fetch activities');
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserStatus();
      fetchActivities();
    }
  }, [isLoggedIn]);

  const handleJoinActivity = async (activityId) => {
    
    try {
      // 只有在用户未加入活动时才允许加入
      if (userStatus) {
        toast.error('You have already joined an activity');
        return;
      }

      await axios.post(`${backendUri}/api/event-participant`, {
        user_id: userData.user_id,
        event_id: activityId
      });

      // 更新用户状态为已参与
      await axios.put(`${backendUri}/api/user/status`, {
        user_id: userData.user_id,
        user_status: true,
        joined_event_id: activityId
      });

      toast.success('Successfully joined the activity!');
      await fetchUserStatus();  // 刷新用户状态
      await fetchActivities();  // 刷新活动信息
    } catch (err) {
      toast.error('Failed to join activity');
      console.error(err);
    }
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 4, width: '90%', margin: 'auto', py: 10 }}>
      <Typography variant="h5" align="center" gutterBottom sx={{ mt: 2 }}>
        Available Diving Activities
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Title</strong></TableCell>
            <TableCell><strong>Date</strong></TableCell>
            <TableCell align="center"><strong>Slots</strong></TableCell>
            <TableCell align="center"><strong>Action</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activities.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center">No available activities</TableCell>
            </TableRow>
          ) : (
            activities.map((activity) => (
              <TableRow key={activity.event_id}>
                <TableCell>{activity.title}</TableCell>
                <TableCell>{new Date(activity.date).toLocaleDateString()}</TableCell>
                <TableCell align="center">
                  {activity.slots_now} / {activity.max_slots}
                </TableCell>
                <TableCell align="center">
                  {userStatus ? (
                    joinedActivityId === activity.event_id ? (
                      <Button variant="contained" color="success" disabled>
                        Joined
                      </Button>
                    ) : (
                      <Button variant="contained" disabled>
                        Locked
                      </Button>
                    )
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => handleJoinActivity(activity.event_id)}
                    >
                      Join
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DiveLobby;
