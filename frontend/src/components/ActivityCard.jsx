import React from 'react';

export default function ActivityCard({ activity, onClick }) {
  const shortDesc = activity.description.length > 100
    ? activity.description.slice(0, 100) + '...'
    : activity.description;

  return (
    <div
      onClick={() => onClick(activity.event_id)}
      className="cursor-pointer p-4 border rounded shadow hover:shadow-lg transition"
    >
      <h3 className="text-xl font-semibold mb-2">{activity.title}</h3>
      <p className="text-sm text-gray-500 mb-1">{new Date(activity.date).toLocaleDateString()}</p>
      <p className="text-gray-700 mb-2">{shortDesc}</p>
      <p className="text-sm text-gray-600">Location: {activity.location}</p>
      <p className="text-sm text-gray-600">Slots available: {activity.slots_available}</p>
    </div>
  );
}
