import {generateColors} from '../createGame';
import React from 'react';
import SingleTile from './SingleTile';
import { updateCurrentTiles, updateSolution } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function GameRow() {
    const dispatch = useDispatch();
    const [colors, setColors] = React.useState(useSelector(state => state.tiles) || generateColors(10));

    React.useEffect(() => {
        dispatch(updateSolution(colors));
        dispatch(updateCurrentTiles(colors));
    }, [colors, dispatch]);
    
    return (
        <DragDropContext id='play'>
            <Droppable droppableId='game-row'>
                {(provided) => (
                    <div {...provided.droppableProps} ref = {provided.innerRef} id='game-row'>
                        {colors.map((color, index) => 
                        <Draggable key={color} draggableId={color.toString()} index={index}>
                            {provided => (
                                <SingleTile key={color} color={color}/>
                            )}
                        </Draggable>)}
                    </div>
                )}
            </Droppable>
            <hr/>
            <button id="next-round" onClick={() => setColors(generateColors(10))}>Next Round of Colors</button>
        </DragDropContext>
  );
}

export default GameRow;
