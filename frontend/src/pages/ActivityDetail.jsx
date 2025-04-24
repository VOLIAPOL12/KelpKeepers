import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getActivityById } from '../mocks/api';

export default function ActivityDetailPage() {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    getActivityById(id).then(setActivity);
  }, [id]);

  if (!activity) return <p>Loading activity...</p>;

  return (
    <div>
      <h2>{activity.title}</h2>
      <p>Date: {activity.date}</p>
      <p>Description: {activity.description}</p>
      {activity.rating ? <p>Average Rating: {activity.rating}</p> : <p>No Rating Yet</p>}
    </div>
  );
}
