import {generateColors} from '../createGame';
import React from 'react';
import SingleTile from './SingleTile';

function GameRow() {
    const [colors, setColors] = React.useState(generateColors(10));
    React.useEffect(() => console.dir(colors), [colors])
    return (
        <div id='play'>
            <div id="game-row" key={colors[0]}>
            {colors.map(color => <SingleTile color={color} key={color}/>)}
            </div>
            <hr/>
            <button id="next-round" onClick={() => setColors(generateColors(10))}>Next Round of Colors</button>
        </div>
  );
}

export default GameRow;
