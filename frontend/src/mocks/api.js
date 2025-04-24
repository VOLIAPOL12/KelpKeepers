// src/mocks/api.js

export const getDivingHistory = () => {
    return Promise.resolve([
      { id: 1, title: 'Coral Cleanup', date: '2025-03-20', rating: 4.5 },
      { id: 2, title: 'Night Dive Training', date: '2025-04-01', rating: 5.0 },
    ]);
  };
  
  export const getScoreboard = () => {
    return Promise.resolve([
      { id: 1, name: 'Alice', score: 95 },
      { id: 2, name: 'Bob', score: 89 },
      { id: 3, name: 'Charlie', score: 76 },
    ]);
  };
  
  export const getUserProfile = () => {
    return Promise.resolve({
      username: 'kelpdiver123',
      email: 'kelpdiver@example.com',
      joined: '2024-12-01',
    });
  };
  
  export const getActivityById = (id) => {
    const mockActivities = {
      1: { id: 1, title: 'Coral Cleanup', date: '2025-03-20', description: 'Removing waste from coral reef area', rating: 4.5 },
      2: { id: 2, title: 'Night Dive Training', date: '2025-04-01', description: 'Night dive with safety procedures', rating: 5.0 },
    };
    return Promise.resolve(mockActivities[id]);
  };
  