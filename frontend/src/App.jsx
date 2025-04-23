import HomePage from './pages/HomePage'
import JourneyPage from './pages/JourneyPage';
import ExplorePage from './pages/ExplorePage';
import { Routes, Route } from "react-router-dom";

import React from 'react';
import './components/KelpMap.css';
import LoginPage from './pages/authentication/LoginPage';
import UnauthenticatedPageWrapper from './containers/UnauthenticatedPageWrapper';


  
  function App() {
    return (
      <Routes>
        <Route path="/" element={<UnauthenticatedPageWrapper><HomePage /></UnauthenticatedPageWrapper>} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    );
  }
  
  export default App;