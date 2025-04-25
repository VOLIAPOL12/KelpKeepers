// src/mocks/api.js

export const getDivingHistory = () => {
    return Promise.resolve([
      { id: 1, title: 'Coral Cleanup', date: '2025-03-20', rating: 4.5 },
      { id: 2, title: 'Night Dive Training', date: '2025-04-01', rating: 5.0 },
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
  
  export function getScoreboard() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            name: 'Alice',
            score: 95,
            avatar: 'https://i.pravatar.cc/150?img=1',
          },
          {
            id: '2',
            name: 'Bob',
            score: 88,
            avatar: 'https://i.pravatar.cc/150?img=2',
          },
          {
            id: '3',
            name: 'Charlie',
            score: 82,
            avatar: 'https://i.pravatar.cc/150?img=3',
          },
          {
            id: '4',
            name: 'Diana',
            score: 78,
            avatar: 'https://i.pravatar.cc/150?img=4',
          },
          {
            id: '5',
            name: 'Evan',
            score: 74,
            avatar: 'https://i.pravatar.cc/150?img=5',
          },
        ]);
      }, 500); // 模拟网络延迟
    });
  };

  // mocks/api.js
export function updateUserProfile(newProfile) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 模拟返回更新后的用户数据，假设avatar和joined保持不变
      resolve({
        ...newProfile,
        avatar: '/avatar.png',
        joined: '2023-01-15',
      });
    }, 800);
  });
};
