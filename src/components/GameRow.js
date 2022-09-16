import {generateColors} from '../createGame';
import React from 'react';
import SingleTile from './SingleTile';
import { updateCurrentTiles } from '../store';
import { useSelector, useDispatch } from 'react-redux';

function GameRow() {
    const dispatch = useDispatch();
    const [colors, setColors] = React.useState(useSelector(state => state.tiles) || generateColors(10));
    React.useEffect(() => {
        dispatch(updateCurrentTiles(colors));
    }, [colors, dispatch]);
    return (
        <div id='play'>
            <div id="game-row">
            {colors.map(color => <SingleTile color={color} key={color}/>)}
            </div>
            <hr/>
            <button id="next-round" onClick={() => setColors(generateColors(10))}>Next Round of Colors</button>
        </div>
  );
}

export default GameRow;
