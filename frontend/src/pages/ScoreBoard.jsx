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
    <div className="min-h-screen bg-gradient-to-b from-teal-100 via-blue-50 to-white py-12 px-4 font-sans">
      <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md border border-teal-200 rounded-3xl shadow-2xl p-8">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="mb-6 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-full shadow transition-all font-semibold text-sm"
        >
          ← Back
        </button>

        <h2 className="text-4xl font-extrabold text-center text-teal-900 mb-10 tracking-wide">
          🌿 Kelpkeeper Leaderboard
        </h2>

        {scores.length === 0 ? (
          <p className="text-center text-gray-500">Loading scores...</p>
        ) : (
          <ol className="space-y-4">
            {scores
              .sort((a, b) => b.score - a.score)
              .map((user, index) => {
                const getTierStyle = () => {
                  switch (index) {
                    case 0:
                      return 'bg-yellow-100 border-yellow-400 text-yellow-800';
                    case 1:
                      return 'bg-gray-200 border-gray-400 text-gray-800';
                    case 2:
                      return 'bg-orange-100 border-orange-400 text-orange-800';
                    default:
                      return 'bg-teal-50 border-teal-200 text-teal-800';
                  }
                };

                const tierStyle = getTierStyle();

                return (
                  <li
                    key={user.id}
                    className={`flex items-center justify-between p-4 rounded-xl border-l-8 ${tierStyle} hover:scale-[1.01] transition-transform duration-200 shadow-sm`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-xl font-extrabold w-6 text-right text-teal-700">{index + 1}</div>
                      <img
                        src={user.avatar}
                        alt={`${user.name} avatar`}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                      />
                      <div className="flex flex-col">
                        <span className="text-lg font-semibold">{user.name}</span>
                        <span className="text-xs text-gray-500 tracking-wide uppercase">
                          {index === 0
                            ? '🌟 Kelp Champion'
                            : index === 1
                            ? '🥈 Ocean Guardian'
                            : index === 2
                            ? '🥉 Sea Steward'
                            : 'Diver'}
                        </span>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-blue-700">Score: {user.score}</span>
                  </li>
                );
              })}
          </ol>
        )}
      </div>
    </div>
  );
}
