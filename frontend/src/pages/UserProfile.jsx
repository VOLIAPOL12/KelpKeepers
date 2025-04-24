import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../mocks/api';

export default function UserProfilePage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getUserProfile().then(setProfile);
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h2>User Profile</h2>
      <p>Username: {profile.username}</p>
      <p>Email: {profile.email}</p>
      <p>Joined: {profile.joined}</p>
    </div>
  );
}
