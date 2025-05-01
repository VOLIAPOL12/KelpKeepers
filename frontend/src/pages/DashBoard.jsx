import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ActivityCard from '../components/ActivityCard';

const Dashboard = () => {
  const navigate = useNavigate();
  const [upcomingActivities, setUpcomingActivities] = useState([]);
  const [pastActivities, setPastActivities] = useState([]);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const res = await fetch('/api/diving-activities');
        if (!res.ok) throw new Error('Failed to fetch activities');
        const data = await res.json();

        const now = new Date();
        const upcoming = [];
        const past = [];

        data.forEach(activity => {
          const activityDate = new Date(activity.date);
          if (activityDate >= now) {
            upcoming.push(activity);
          } else {
            past.push(activity);
          }
        });

        setUpcomingActivities(upcoming.sort((a, b) => new Date(a.date) - new Date(b.date)));
        setPastActivities(past.sort((a, b) => new Date(b.date) - new Date(a.date)));
      } catch (error) {
        console.error(error);
      }
    }

    fetchActivities();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/activity/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-100 font-sans px-4 py-8">
      {/* Top Bar */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate('/history')}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-5 py-2 rounded-full shadow-md transition-all duration-200 focus:ring-2 focus:ring-emerald-300"
          >
            Diving History
          </button>
          <button
            onClick={() => navigate('/scoreboard')}
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-5 py-2 rounded-full shadow-md transition-all duration-200 focus:ring-2 focus:ring-cyan-300"
          >
            Scoreboard
          </button>
          <button
            onClick={() => navigate('/create-activity')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-full shadow-md transition-all duration-200 focus:ring-2 focus:ring-indigo-300"
          >
            Create Activity
          </button>
        </div>
        <div
          onClick={() => navigate('/profile')}
          className="cursor-pointer flex items-center gap-2 hover:opacity-90 transition"
        >
          <img
            src="/avatar.png"
            alt="Profile"
            className="w-10 h-10 rounded-full border border-gray-300 shadow-sm object-cover"
          />
          <span className="text-sm text-gray-700 font-medium hidden sm:inline">Profile</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Upcoming */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-emerald-900 mb-6">Upcoming Activities</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {upcomingActivities.length > 0 ? (
              upcomingActivities.map(act => (
                <div
                  key={act.event_id}
                  className="transition-transform hover:scale-[1.01]"
                >
                  <ActivityCard activity={act} onClick={handleCardClick} />
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No upcoming activities.</p>
            )}
          </div>
        </section>

        {/* Past */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-cyan-900 mb-6">Past Activities</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {pastActivities.length > 0 ? (
              pastActivities.map(act => (
                <div
                  key={act.event_id}
                  className="transition-transform hover:scale-[1.01]"
                >
                  <ActivityCard activity={act} onClick={handleCardClick} />
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No past activities.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
