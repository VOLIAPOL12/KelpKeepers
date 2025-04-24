import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActivityCard from '../components/ActivityCard';

const upcomingActivities = [
  { id: '1', title: 'Coral Cleanup', date: '2025-05-02', location: 'Blue Bay', isUpcoming: true },
];
const pastActivities = [
  { id: '2', title: 'Urchin Removal', date: '2025-04-10', location: 'Kelp Cove', rating: 4.6, isUpcoming: false },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/activity/${id}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* 顶部按钮 */}
      <div className="flex justify-between items-center">
        <div className="space-x-4">
          <button onClick={() => navigate('/history')} className="btn">Diving History</button>
          <button onClick={() => navigate('/scoreboard')} className="btn">Scoreboard</button>
        </div>
        <div onClick={() => navigate('/profile')} className="cursor-pointer">
          <img src="/avatar.png" alt="Profile" className="w-10 h-10 rounded-full" />
        </div>
      </div>

      {/* Upcoming */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Upcoming Activities</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {upcomingActivities.map(act => (
            <ActivityCard key={act.id} activity={act} onClick={handleCardClick} />
          ))}
        </div>
      </div>

      {/* Past */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Past Activities</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {pastActivities.map(act => (
            <ActivityCard key={act.id} activity={act} onClick={handleCardClick} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
