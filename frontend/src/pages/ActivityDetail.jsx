import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ActivityDetail() {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchActivity() {
      try {
        const res = await fetch(`/api/diving-activities/${id}`);
        if (!res.ok) throw new Error('Activity not found');
        const data = await res.json();
        setActivity(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchActivity();
  }, [id]);

  if (!activity) return <p>Loading activity details...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button
        className="mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>
      <h2 className="text-3xl font-bold mb-4">{activity.title}</h2>
      <p className="text-gray-600 mb-2">
        Date: {new Date(activity.date).toLocaleDateString()}
      </p>
      <p className="text-gray-600 mb-2">Location: {activity.location}</p>
      <p className="text-gray-600 mb-2">Slots available: {activity.slots_available}</p>
      <p className="text-gray-700 whitespace-pre-wrap">{activity.description}</p>
    </div>
  );
}
