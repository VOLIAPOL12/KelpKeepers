// frontend/src/App.js

import React from 'react';
import './App.css';
import KelpMap from './components/KelpMap';  

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Kelp Forest Visualization</h1>
        <KelpMap />  {/* insert */}
      </header>
    </div>
  );
}

export default App;
