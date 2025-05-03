import React, { useEffect, useState } from 'react';
import { getDivingHistory } from '../mocks/api';
import ActivityCard from '../components/ActivityCard';
import { useNavigate } from 'react-router-dom';

const DivingHistory = () => {
  const [history, setHistory] = useState(['']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getDivingHistory()
      .then((data) => {
        setHistory(data);
        setError(null);
      })
      .catch((err) => {
        console.error('Failed to fetch diving history:', err);
        setError('Failed to load diving history.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleCardClick = (id) => {
    navigate(`/activity/${id}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8 text-center">
        Loading diving history...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <button
        onClick={handleBack}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        ← back
      </button>

      <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
        Your Diving History
      </h2>

      {history.length === 0 ? (
        <p className="text-center text-gray-500">No diving history found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {history.map((act) => (
            <ActivityCard key={act.event_id} activity={act} onClick={handleCardClick} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DivingHistory;
