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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Diving History</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {history.map(act => (
          <ActivityCard key={act.id} activity={act} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
};

export default DivingHistoryPage;
