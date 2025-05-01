import React, { useEffect, useState } from 'react';
import { getUserProfile, updateUserProfile } from '../mocks/api'; // 假设你有更新接口

export default function UserProfilePage() {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserProfile().then((data) => {
      setProfile(data);
      setFormData({ username: data.username, email: data.email });
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // 调用API更新用户资料，这里用假函数模拟
    updateUserProfile(formData).then((updatedProfile) => {
      setProfile(updatedProfile);
      setEditMode(false);
    });
  };

  const handleCancel = () => {
    setFormData({ username: profile.username, email: profile.email });
    setEditMode(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      {!editMode ? (
        <>
          {/* 查看模式 */}
          <div className="flex justify-center mb-6">
            <img
              src={profile.avatar || '/avatar.png'}
              alt="User Avatar"
              className="w-28 h-28 rounded-full border-4 border-blue-500 object-cover"
            />
          </div>

          <h2 className="text-3xl font-semibold text-center mb-4 text-gray-900">
            {profile.username}
          </h2>

          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-medium text-gray-500">Email</h3>
              <p className="text-lg">{profile.email}</p>
            </div>

            <div>
              <h3 className="font-medium text-gray-500">Joined</h3>
              <p className="text-lg">{profile.joined}</p>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
          </div>
        </>
      ) : (
        <>
          {/* 编辑模式 */}
          <h2 className="text-2xl font-semibold mb-6 text-center">Edit Profile</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
            className="space-y-4"
          >
            <div>
              <label className="block mb-1 font-medium text-gray-700" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
