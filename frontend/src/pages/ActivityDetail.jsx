import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ActivityDetail() {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
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

    async function fetchAverageRating() {
      try {
        const res = await fetch(`/api/ratings/average/${id}`);
        if (!res.ok) throw new Error('Failed to fetch average rating');
        const data = await res.json();
        setAverageRating(data.average_rating);
      } catch (error) {
        console.error(error);
      }
    }

    fetchActivity();
    fetchAverageRating();
  }, [id]);

  if (!activity) return <p>Loading activity details...</p>;

  const isPast = new Date(activity.date) < new Date();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button
        className="mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        onClick={() => navigate('/dashboard')}
      >
        ← Back to Dashboard
      </button>

      <h2 className="text-3xl font-bold mb-2">{activity.title}</h2>
      <p className="text-gray-600 mb-2">
        Date: {new Date(activity.date).toLocaleDateString()}
      </p>
      <p className="text-gray-600 mb-2">Location: {activity.location}</p>
      <p className="text-gray-600 mb-2">Slots available: {activity.slots_available}</p>
      <p className="text-gray-700 whitespace-pre-wrap mb-4">{activity.description}</p>

      {/* 显示平均评分 */}
      {averageRating !== null ? (
        <p className="text-yellow-600 font-medium mb-6">
          ⭐ Average Rating: {Number(averageRating).toFixed(1)} / 5
        </p>
      ) : (
        <p className="text-gray-500 mb-6">No ratings yet.</p>
      )}

      {isPast && (
        <>
        <p className="text-lg font-medium text-gray-700 mb-2">
          Was this activity helpful for saving kelp forest?
        </p>
        <button
          onClick={() => navigate(`/rating/${activity.event_id}`)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-5 py-2 rounded-full shadow-md transition-all duration-200 focus:ring-2 focus:ring-yellow-300"
        >
          Rate Activity
        </button>
        </>
      )}
    </div>
  );
}
