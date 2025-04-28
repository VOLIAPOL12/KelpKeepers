import HomePage from './pages/HomePage'
import JourneyPage from './pages/JourneyPage';
import ExplorePage from './pages/ExplorePage';
import { Routes, Route } from "react-router-dom";

import React from 'react';
import './components/KelpMap.css';
import LoginPage from './pages/authentication/LoginPage';
import UnauthenticatedPageWrapper from './containers/UnauthenticatedPageWrapper';
import ResetPasswordPage from './pages/authentication/ResetPasswordPage';
import DashboardPage from './pages/DashboardPage';
import { ToastContainer } from 'react-toastify';
import ProtectedWrapper from './containers/ProtectedWrapper';
import EmailVerify from './pages/authentication/EmailVerify';

  function App() {
    return (
      <div>
        <ToastContainer/>
        <Routes>
          
          <Route path="/" element={<UnauthenticatedPageWrapper><HomePage /></UnauthenticatedPageWrapper>} />
          <Route path="/journey" element={<JourneyPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot" element={<ResetPasswordPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedWrapper>
                <DashboardPage />
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
        </Routes>
      </div>
    );
  }
  
  export default App;