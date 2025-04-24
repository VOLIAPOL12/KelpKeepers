import React from 'react';

const ActivityCard = ({ activity, onClick }) => {
  return (
    <div onClick={() => onClick(activity.id)} className="p-4 border rounded-xl shadow hover:shadow-md cursor-pointer transition-all">
      <h3 className="text-lg font-semibold">{activity.title}</h3>
      <p className="text-sm text-gray-500">{activity.location} • {activity.date}</p>
      {!activity.isUpcoming && activity.rating !== undefined && (
        <p className="text-yellow-600 mt-1">Rating: {activity.rating.toFixed(1)} / 5</p>
      )}
    </div>
  );
};

export default ActivityCard;
