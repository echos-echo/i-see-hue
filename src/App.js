import GameRow from './components/GameRow';
import Splash from './components/Splash'
import React, { useState } from 'react';

function App() {
  const [mode, setMode] = useState('medium');

  return (
    <div className="content">
      <Splash/>
      <div id="header">
        <h1>Test Your Color Perception</h1>
        <h2>Click and Drag the tiles so the colors appear in gradient order</h2>
        <select>
          <option value='easy'>Easy</option>
          <option value='medium'>Medium</option>
          <option value='hard'>Hard</option>
          <option value='extra'>Hard+++</option>
        </select>
        <GameRow/>
      </div>
    </div>
  );
}

export default App;
