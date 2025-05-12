import React from 'react';

export default function ActivityCard({ key, activity, onClick }) {
  const shortDesc = activity.description?.length > 100
    ? activity.description.slice(0, 100) + '...'
    : activity.description;

  return (
    <div
      onClick={() => onClick(activity.event_id)}
      className="cursor-pointer p-6 bg-white/70 backdrop-blur-lg rounded-2xl border border-gray-200 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group"
    >
      {/* Background glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 rounded-2xl pointer-events-none"></div>

      {/* Title and Date */}
      <h3 className="text-2xl font-bold text-gray-800 mb-1">{activity.title}</h3>
      <p className="text-xs text-gray-500 mb-3">
        {new Date(activity.date).toLocaleDateString()}
      </p>

      {/* Description */}
      <p className="text-gray-700 mb-4 leading-snug">{shortDesc}</p>

      {/* Info Badges */}
      <div className="flex flex-wrap gap-2 text-sm">
        <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
          📍 {activity.location}
        </span>
        <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
          🎟 {activity.slots_available} slot{activity.slots_available > 1 ? 's' : ''}
        </span>
      </div>
    </div>
  );
}
