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
import DiveLobby from './pages/DiveLobby'; 

  
function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={<HomePage />} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route
          path="/explore"
          element={
            <UnauthenticatedPageWrapper>
              <ExplorePage />
            </UnauthenticatedPageWrapper>
          }
        />
        <Route path="/login" element={<UnauthenticatedPageWrapper><LoginPage /></UnauthenticatedPageWrapper>} />
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
        <Route
          path="/history"
          element={
            <ProtectedWrapper>
              <DivingHistory />
            </ProtectedWrapper>
          }
        />
        <Route
          path="/scoreboard"
          element={
            <ProtectedWrapper>
              <Scoreboard />
            </ProtectedWrapper>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedWrapper>
              <UserProfile />
            </ProtectedWrapper>
          }
        />
        <Route
          path="/activity/:id"
          element={
            <ProtectedWrapper>
              <ActivityDetail />
            </ProtectedWrapper>
          }
        />
        <Route
          path="/create-activity"
          element={
            <ProtectedWrapper>
              <CreateActivity />
            </ProtectedWrapper>
          }
        />
        <Route
          path="/camera"
          element={
            <ProtectedWrapper>
              <PhotoCapturePage/>
            </ProtectedWrapper>
          }
        />
        <Route
          path="/lobby"
          element={
            <ProtectedWrapper>
              <DiveLobby/>
            </ProtectedWrapper>
          }
        />

        <Route
          path="/rating/:activityId"
          element={
            <ProtectedWrapper>
              <RatingPage />
            </ProtectedWrapper>
          }
        />
      </Routes>
    </>
  )
}

export default App;