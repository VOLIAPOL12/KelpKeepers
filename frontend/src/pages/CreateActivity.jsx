import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateActivity() {
  const navigate = useNavigate();

  // 表单状态
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [slotsAvailable, setSlotsAvailable] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // 假设你有登录状态，这里先写死host_user_id
  const hostUserId = 1;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!title || !description || !location || !date || slotsAvailable < 1) {
      setError('Please fill all fields correctly.');
      setLoading(false);
      return;
    }

    const newActivity = {
      title,
      description,
      location,
      date,
      slots_available: slotsAvailable,
      host_user_id: hostUserId,
    };

    try {
      const res = await fetch('/api/diving-activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newActivity),
      });

      if (!res.ok) throw new Error('Failed to create activity.');

      const data = await res.json();
      setLoading(false);
      // 创建成功后跳转到详情页
      navigate(`/activity/${data.event_id}`);
    } catch (err) {
      setError(err.message || 'Error occurred.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6">Create New Diving Activity</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Location</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Date</label>
          <input
            type="date"
            className="w-full border rounded px-3 py-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Slots Available</label>
          <input
            type="number"
            min="1"
            className="w-full border rounded px-3 py-2"
            value={slotsAvailable}
            onChange={(e) => setSlotsAvailable(Number(e.target.value))}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Activity'}
        </button>
      </form>
    </div>
  );
}
