// frontend/src/App.js
import HomePage from './pages/HomePage'
import { Routes, Route } from "react-router-dom";
import UnauthenticatedPageWrapper from "./containers/UnauthenticatedPageWrapper"

// import React from 'react';
import React, { useState } from 'react';
// import './App.css';
import KelpMap from './components/KelpMap.jsx';  
import './components/KelpMap.css';
import SeaUrchinMap from './components/SeaUrchinMap';
import AbaloneMap from './components/AbaloneMap';
import SeadragonMap from './components/SeadragonMap';
import SeastarMap from './components/SeastarMap';
import HandfishMap from './components/HandfishMap';


function Dashboard() {
    const [currentMap, setCurrentMap] = useState('Kelp');
  
    const renderMap = () => {
        switch (currentMap) {
            case 'Kelp': return <KelpMap />;
            case 'SeaUrchin': return <SeaUrchinMap />;
            case 'Abalone': return <AbaloneMap />;
            case 'Seadragon': return <SeadragonMap />;
            case 'Seastar': return <SeastarMap />;
            case 'Handfish': return <HandfishMap />;
            default: return <KelpMap />;
        }
    };
  
    return (
      <div>
        <h1>Visualization Dashboard</h1>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
          <button onClick={() => setCurrentMap('Kelp')}>Kelp</button>
          <button onClick={() => setCurrentMap('SeaUrchin')}>Sea Urchin</button>
          <button onClick={() => setCurrentMap('Abalone')}>Abalone</button>
          <button onClick={() => setCurrentMap('Seadragon')}>Seadragon</button>
          <button onClick={() => setCurrentMap('Seastar')}>Seastar</button>
          <button onClick={() => setCurrentMap('Handfish')}>Handfish</button>
        </div>
        {renderMap()}
      </div>
    );
  }
  
  function App() {
    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    );
  }
  
  export default App;








