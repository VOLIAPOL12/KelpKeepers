// frontend/src/App.js
import HomePage from './pages/HomePage'
import { Routes, Route } from "react-router-dom";

import React from 'react';
import './components/KelpMap.css';


  
  function App() {
    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    );
  }
  
  export default App;