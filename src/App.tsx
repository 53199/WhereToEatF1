import React from 'react';
import { MapView } from './components/map/MapView';
import { TimeSimulator } from './components/TimeSimulator';
import { initializeTimeSimulation } from './utils/timeSimulation';

// Initialise la simulation temporelle
initializeTimeSimulation();

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <MapView />
      <TimeSimulator />
    </div>
  );
}

export default App;