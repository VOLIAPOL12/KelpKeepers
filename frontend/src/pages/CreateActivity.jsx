import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateActivity() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [slotsAvailable, setSlotsAvailable] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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

      await res.json();
      setLoading(false);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Error occurred.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0fdfa] via-[#ecfeff] to-[#f7fdfc] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl bg-white border border-teal-100 rounded-3xl shadow-xl p-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition font-medium text-sm shadow-sm"
        >
          ← Back to Dashboard
        </button>

        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Create New Diving Activity</h2>

        {error && (
          <p className="text-red-600 mb-4 text-center font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-300 transition"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-300 transition resize-none"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-300 transition"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-300 transition"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slots Available</label>
            <input
              type="number"
              min="1"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-300 transition"
              value={slotsAvailable}
              onChange={(e) => setSlotsAvailable(Number(e.target.value))}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-xl shadow-md transition-all disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Activity'}
          </button>
        </form>
      </div>
    </div>
  );
}
