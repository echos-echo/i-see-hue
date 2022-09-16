import {generateColors} from '../createGame';
import React from 'react';
import SingleTile from './SingleTile';

function GameRow() {
    const [colors, setColors] = React.useState(generateColors(10));
  return (
    <div id="game-row">
      {colors.map(color => <SingleTile color={color} key={color}/>)}
      <hr/>
      <button id="next-round">Next Round of Colors</button>
    </div>
  );
}

export default GameRow;
