import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const RatingPage = () => {
  const { activityId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const title = state?.title || "Dive Activity"; // fallback title
  const result_id = state?.result_id || null

  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [counts, setCounts] = useState({});
  const [userRating, setUserRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    fetch(`/api/ratings/${activityId}`)
      .then(res => res.json())
      .then(data => {
        setRatings(data);
        updateStats(data);
      })
      .catch(err => console.error('Failed to load ratings', err));
  }, [activityId]);

  const updateStats = (ratingsList) => {
    const total = ratingsList.length;
    const sum = ratingsList.reduce((acc, cur) => acc + cur.rating, 0);
    const avg = total ? (sum / total).toFixed(1) : 0;

    const countMap = {};
    for (let i = 1; i <= 5; i++) countMap[i] = 0;
    ratingsList.forEach(r => countMap[r.rating]++);

    setAverageRating(avg);
    setCounts(countMap);
  };

  const submitRating = async () => {
    const newRating = {
      event_id: activityId,
      rating: userRating,
      comment: feedback
    };
  
    try {
      await axios.post('/api/ratings', newRating);
  
      const { data } = await axios.get(`/api/ratings/${activityId}`);
      setRatings(data);
      updateStats(data);
      setFeedback('');
      setUserRating(0);
    } catch (err) {
      console.error('Failed to submit rating:', err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-18">
      <button
        onClick={() => navigate(`/activity/${activityId}`)}
        className="mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
      >
        ← Back to Activity
      </button>

      <h1 className="text-2xl font-bold mb-6">
        Rate: <span className="text-emerald-700">{title}</span>
      </h1>

      <div className="mb-6">
        <p className="text-lg">Average Rating: <strong>{averageRating}</strong> ⭐</p>
        <ul className="mt-3 space-y-1">
          {[5, 4, 3, 2, 1].map(star => (
            <li key={star}>{star} Star: {counts[star] || 0}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="font-semibold mb-2">Your Rating</h2>
        <div className="flex gap-2 mb-3">
          {[1, 2, 3, 4, 5].map(i => (
            <button
              key={i}
              className={`w-8 h-8 text-white rounded-full ${userRating >= i ? 'bg-yellow-500' : 'bg-gray-300'}`}
              onClick={() => setUserRating(i)}
            >
              {userRating >= i ? '⭐' : '☆'}
            </button>
          ))}
        </div>
        <textarea
          className="w-full p-2 border rounded mb-3"
          rows="3"
          placeholder="Write your feedback..."
          value={feedback}
          onChange={e => setFeedback(e.target.value)}
        />
        <button
          onClick={submitRating}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Feedback from Other Users</h2>
        {ratings.length ? (
          ratings.map((r, idx) => (
            <div key={idx} className="border-b py-3 flex gap-3 items-start">
              <img src={r.avatar || '/default-avatar.png'} alt="avatar" className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-medium">{r.nickname}</p>
                <p className="text-yellow-500">{"⭐".repeat(r.rating)}</p>
                <p className="text-gray-700">{r.comment}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No feedback yet.</p>
        )}
      </div>
    </div>
  );
};

export default RatingPage;
