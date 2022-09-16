import {generateColors} from '../createGame';
import React from 'react';
import SingleTile from './SingleTile';

function GameRow() {
    const [colors, setColors] = React.useState(generateColors());
  return (
    <div id="game-row">
      {colors.map(color => <SingleTile color={color} key={color}/>)}
    </div>
  );
}

export default GameRow;
