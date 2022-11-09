import GameRow from './components/GameRow';
import Splash from './components/Splash'
import React from 'react';

function App() {

  return (
    <div className="content">
      <Splash/>
      <div id="header">
        <h1>Unmix the Hues</h1>
        <h2>click and drag the tiles so the colors appear in gradient order</h2>
        <GameRow/>
      </div>
    </div>
  );
}

export default App;
