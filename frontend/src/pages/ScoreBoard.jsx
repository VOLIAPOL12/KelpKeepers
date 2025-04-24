import React, { useEffect, useState } from 'react';
import { getScoreboard } from '../mocks/api';

export default function ScoreboardPage() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    getScoreboard().then(setScores);
  }, []);

  return (
    <div>
      <h2>Scoreboard</h2>
      <ol>
        {scores.map(user => (
          <li key={user.id}>{user.name} — Score: {user.score}</li>
        ))}
      </ol>
    </div>
  );
}
