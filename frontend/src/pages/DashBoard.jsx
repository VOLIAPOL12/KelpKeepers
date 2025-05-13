import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ActivityCard from '../components/ActivityCard';

const Dashboard = () => {
  const navigate = useNavigate();
  const [upcomingActivities, setUpcomingActivities] = useState([]);
  const [pastActivities, setPastActivities] = useState([]);
  const [showNotice, setShowNotice] = useState(true);

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

  const NoticeModal = ({ onClose }) => {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t border-gray-200 p-6 animate-slide-up">
        <div className="max-w-4xl mx-auto text-gray-700 text-sm leading-relaxed">
          <p className="mb-2 font-semibold">⚠️ Note:</p>
          <ul className="list-disc pl-5 mb-3">
            <li>Please make sure you are in good physical condition before diving.</li>
            <li>Please ensure that the equipment is in good condition and follow professional instructions.</li>
            <li>Pay attention to tidal changes and follow safe operating procedures.</li>
          </ul>
          <p className="mb-2">
          Any information collected by this website will be strictly subject to the privacy policy, please see our
            <a href="#" className="underline text-blue-600">Terms of Use</a> and
            <a href="#" className="underline text-blue-600 ml-1">Privacy Policy</a>。
          </p>
          <button
            onClick={onClose}
            className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-sm transition-all"
          >
            I have read
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-100 font-sans px-4 py-8">
      {/* Top Text */}
      <div className="text-center mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          You can find diving activities here!
        </h1>
      </div>

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
          <button
            onClick={() => navigate('/camera')}
            className="bg-indigo-500 hover:bg-indigo-300 text-white font-semibold px-5 py-2 rounded-full shadow-md transition-all duration-200 focus:ring-2 focus:ring-indigo-300"
          >
            Camera
          </button>
          <button
            onClick={() => navigate('/rating')}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-5 py-2 rounded-full shadow-md transition-all duration-200 focus:ring-2 focus:ring-yellow-300"
          >
            Rate Activity
          </button>

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

      {/* Bottom Slide-in Modal */}
      {showNotice && <NoticeModal onClose={() => setShowNotice(false)} />}
    </div>
  );
};

export default Dashboard;
