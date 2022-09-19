import GameRow from './components/GameRow';
import Splash from './components/Splash'
import React from 'react';

function App() {
  return (
    <div className="content">
      <Splash/>
      <div id="header">
        <h1>Test Your Color Perception</h1>
        <h2>Click and Drag the tiles so the colors appear in gradient order</h2>
        <GameRow/>
      </div>
    </div>
  );
}

export default App;
