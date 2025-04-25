import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getActivityById } from '../mocks/api';

export default function ActivityDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    getActivityById(id).then(setActivity);
  }, [id]);

  if (!activity) return <p className="text-center mt-10 text-gray-500">Loading activity...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        ← Back
      </button>

      <h2 className="text-3xl font-bold mb-4 text-gray-900">{activity.title}</h2>

      <p className="text-gray-600 mb-2">
        <span className="font-semibold">Date:</span>{' '}
        {new Date(activity.date).toLocaleDateString()}
      </p>

      <p className="text-gray-700 mb-4 whitespace-pre-line">{activity.description || 'No description available.'}</p>

      {activity.rating !== undefined ? (
        <p className="text-yellow-600 font-semibold">
          Average Rating: {activity.rating.toFixed(1)} ⭐
        </p>
      ) : (
        <p className="text-gray-500 italic">No Rating Yet</p>
      )}
    </div>
  );
}
