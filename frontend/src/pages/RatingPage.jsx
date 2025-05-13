import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RatingPage = () => {
  const { activityId } = useParams(); // 从URL中获取活动ID（如有）
  
  // 静态的 mock 数据
  const mockRatings = [
    { score: 5 },
    { score: 4 },
    { score: 5 },
    { score: 3 },
    { score: 4 },
    { score: 2 }
  ];

  const mockFeedbacks = [
    {
      text: "The activity was very interesting and I learned a lot!",
      user: {
        nickname: "Sicko mode",
        avatar: "https://i.pravatar.cc/100?img=3"
      }
    },
    {
      text: "Well organized, but a bit long.",
      user: {
        nickname: "Jax",
        avatar: "https://i.pravatar.cc/100?img=5"
      }
    },
    {
      text: "I hope there will be more interactive sessions next time!",
      user: {
        nickname: "Master Yi",
        avatar: "https://i.pravatar.cc/100?img=8"
      }
    }
  ];

  const [ratings, setRatings] = useState(mockRatings);
  const [averageRating, setAverageRating] = useState(0);
  const [counts, setCounts] = useState({});
  const [userRating, setUserRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [allFeedbacks, setAllFeedbacks] = useState(mockFeedbacks);

  useEffect(() => {
    updateStats(mockRatings);
  }, []);

  const updateStats = (ratingsList) => {
    const total = ratingsList.length;
    const sum = ratingsList.reduce((acc, cur) => acc + cur.score, 0);
    const avg = total ? (sum / total).toFixed(1) : 0;

    const countMap = {};
    for (let i = 1; i <= 5; i++) countMap[i] = 0;
    ratingsList.forEach(r => countMap[r.score]++);

    setAverageRating(avg);
    setCounts(countMap);
  };

  const submitRating = () => {
    const newRating = { score: userRating };
    const newFeedback = {
      text: feedback,
      user: { nickname: 'User123', avatar: '/avatar.png' }
    };

    setRatings(prev => [...prev, newRating]);
    setAllFeedbacks(prev => [...prev, newFeedback]);
    updateStats([...ratings, newRating]);
    setFeedback('');
    setUserRating(0);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Activity Rating</h1>

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
      {userRating >= i ? '⭐' : '☆'} {/* 使用星星代替数字 */}
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
        {allFeedbacks.length ? (
          allFeedbacks.map((fb, idx) => (
            <div key={idx} className="border-b py-3 flex gap-3 items-start">
              <img src={fb.user.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-medium">{fb.user.nickname}</p>
                <p className="text-gray-700">{fb.text}</p>
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