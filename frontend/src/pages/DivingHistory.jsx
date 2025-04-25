import React, { useEffect, useState } from 'react';
import { getDivingHistory } from '../mocks/api';
import ActivityCard from '../components/ActivityCard';
import { useNavigate } from 'react-router-dom';

const DivingHistoryPage = () => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getDivingHistory().then(setHistory);
  }, []);

  const handleCardClick = (id) => {
    navigate(`/activity/${id}`);
  };

  // 返回上一页
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      {/* 返回按钮 */}
      <button
        onClick={handleBack}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        ← back
      </button>

      <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">Your Diving History</h2>

      {history.length === 0 ? (
        <p className="text-center text-gray-500">No diving history found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {history.map(act => (
            <ActivityCard key={act.id} activity={act} onClick={handleCardClick} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DivingHistoryPage;
