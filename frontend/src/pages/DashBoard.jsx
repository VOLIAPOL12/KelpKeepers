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
    <div className="p-6 space-y-8 max-w-5xl mx-auto">
      {/* 顶部按钮区域 */}
      <div className="flex justify-between items-center mb-6">
        <div className="space-x-4">
          <button
            onClick={() => navigate('/history')}
            className="btn bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300"
          >
            Diving History
          </button>
          <button
            onClick={() => navigate('/scoreboard')}
            className="btn bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300"
          >
            Scoreboard
          </button>
        </div>
        <div
          onClick={() => navigate('/profile')}
          className="cursor-pointer rounded-full overflow-hidden border-2 border-gray-300 hover:border-blue-600 transition duration-300"
          title="Go to Profile"
        >
          <img src="/avatar.png" alt="Profile" className="w-12 h-12 object-cover" />
        </div>
      </div>

      {/* Upcoming Activities */}
      <section>
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Upcoming Activities</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {upcomingActivities.length > 0 ? (
            upcomingActivities.map(act => (
              <ActivityCard key={act.id} activity={act} onClick={handleCardClick} />
            ))
          ) : (
            <p className="text-gray-500 italic">No upcoming activities.</p>
          )}
        </div>
      </section>

      {/* Past Activities */}
      <section>
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Past Activities</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {pastActivities.length > 0 ? (
            pastActivities.map(act => (
              <ActivityCard key={act.id} activity={act} onClick={handleCardClick} />
            ))
          ) : (
            <p className="text-gray-500 italic">No past activities.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
