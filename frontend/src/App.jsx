import HomePage from './pages/HomePage'
import JourneyPage from './pages/JourneyPage';
import ExplorePage from './pages/ExplorePage';
import { Routes, Route } from "react-router-dom";

import React from 'react';
import './components/KelpMap.css';
import LoginPage from './pages/authentication/LoginPage';
import UnauthenticatedPageWrapper from './containers/UnauthenticatedPageWrapper';
import Dashboard from './pages/DashBoard';
import DivingHistory from './pages/DivingHistory.jsx';
import Scoreboard from './pages/Scoreboard';
import UserProfile from './pages/UserProfile';
import ActivityDetail from './pages/ActivityDetail';
import CreateActivity from './pages/CreateActivity';

  
  function App() {
    return (
      <Routes>
        <Route path="/" element={<UnauthenticatedPageWrapper><HomePage /></UnauthenticatedPageWrapper>} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<DivingHistory />} />
        <Route path="/scoreboard" element={<Scoreboard />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/activity/:id" element={<ActivityDetail />} />
        <Route path="/create-activity" element={<CreateActivity />} />
        
      </Routes>
    );
  }
  
  export default App;