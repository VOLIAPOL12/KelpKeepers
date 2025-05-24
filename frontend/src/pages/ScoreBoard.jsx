import React, { useEffect, useState } from 'react';
import { getScoreboard } from '../mocks/api';

export default function Scoreboard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    getScoreboard().then(setScores);
  }, []);

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        {/* Back Button */}
        <div className="p-4 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="bg-blue-700 text-white px-4 py-2 rounded shadow hover:bg-blue-800 font-semibold text-sm"
          >
            ← Back
          </button>
          <h2 className="text-2xl font-bold text-center text-gray-800 flex-1 text-center -ml-16">
            Kelpkeeper Leaderboard
          </h2>
        </div>

        {scores.length === 0 ? (
          <p className="text-center text-gray-500 py-8">Loading scores...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
              <thead className="bg-gray-100 text-gray-600 uppercase tracking-wide text-xs">
                <tr>
                  <th className="px-6 py-3">Rank</th>
                  <th className="px-6 py-3">Avatar</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3 text-right">Score</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {scores
                  .sort((a, b) => b.score - a.score)
                  .map((user, index) => {
                    const getTierLabel = () => {
                      switch (index) {
                        case 0:
                          return '🌟 Kelp Champion';
                        case 1:
                          return '🥈 Ocean Guardian';
                        case 2:
                          return '🥉 Sea Steward';
                        default:
                          return 'Diver';
                      }
                    };

                    return (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-bold text-gray-800">{index + 1}</td>
                        <td className="px-6 py-4">
                          <img
                            src={user.avatar}
                            alt={`${user.name} avatar`}
                            className="w-10 h-10 rounded-full border shadow-sm object-cover"
                          />
                        </td>
                        <td className="px-6 py-4 text-gray-700 font-medium">{user.name}</td>
                        <td className="px-6 py-4 text-gray-500">{getTierLabel()}</td>
                        <td className="px-6 py-4 text-right text-blue-700 font-semibold">Score: {user.score}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
