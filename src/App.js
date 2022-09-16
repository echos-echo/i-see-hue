import './App.css';
import GameRow from './components/GameRow';
import React from 'react';

function App() {
  return (
    <div className="content">
      <div id="header">
        <h1>Test Your Color Perception</h1>
        <h2>Click and Drag the tiles so the colors appear in gradient order</h2>
      </div>
      <GameRow/>
    </div>
  );
}

export default App;
