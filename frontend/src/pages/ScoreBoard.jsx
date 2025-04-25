import React, { useEffect, useState } from 'react';
import { getScoreboard } from '../mocks/api';

export default function ScoreboardPage() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    getScoreboard().then(setScores);
  }, []);

  // 点击返回，调用浏览器后退
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      {/* 返回按钮 */}
      <button
        onClick={handleBack}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        ← Back
      </button>

      <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">Scoreboard</h2>

      {scores.length === 0 ? (
        <p className="text-center text-gray-500">Loading scores...</p>
      ) : (
        <ol className="list-decimal list-inside space-y-3">
          {scores.map(user => (
            <li
              key={user.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-blue-50 transition"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={user.avatar}
                  alt={`${user.name} avatar`}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-medium text-gray-800">{user.name}</span>
              </div>
              <span className="font-semibold text-blue-600">Score: {user.score}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
