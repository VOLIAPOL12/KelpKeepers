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
import UserProfile from './pages/UserProfile';
import ActivityDetail from './pages/ActivityDetail';
import CreateActivity from './pages/CreateActivity';
import ResetPasswordPage from './pages/authentication/ResetPasswordPage';
import { ToastContainer } from 'react-toastify';
import ProtectedWrapper from './containers/ProtectedWrapper';
import EmailVerify from './pages/authentication/EmailVerify';
import PhotoCapturePage from './pages/PhotoCapturePage';
import Scoreboard from './pages/ScoreBoard.jsx';
import RatingPage from './pages/RatingPage.jsx';

  
function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/explore" element={<UnauthenticatedPageWrapper><ExplorePage /></UnauthenticatedPageWrapper>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot" element={<ResetPasswordPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedWrapper>
                <Dashboard />
              </ProtectedWrapper>
            }
          />
          <Route
            path="/email-verify"
            element={
              <ProtectedWrapper>
                <EmailVerify />
              </ProtectedWrapper>
            }
          />
        <Route path="/history" element={<DivingHistory />} />
        <Route path="/scoreboard" element={<Scoreboard />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/activity/:id" element={<ActivityDetail />} />
        <Route path="/create-activity" element={<CreateActivity />} />
        <Route path="/camera" element={<PhotoCapturePage/>} />
        <Route path="/rating" element={<RatingPage />} />
        <Route path="/rating/:activityId" element={<RatingPage />} />

      </Routes>
    </>
  )
}

export default App;