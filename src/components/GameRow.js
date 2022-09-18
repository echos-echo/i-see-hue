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
        <DragDropContext id='play' onDragEnd={() => {}}>
            <Droppable droppableId='game-row' direction='horizontal'>
                {provided => (
                    <div {...provided.droppableProps} ref = {provided.innerRef} id='game-row'>
                        {colors.map((color, index) => 
                        <div key={color.toString()}>
                        <Draggable draggableId={color.toString()} index={index}>
                            {provided => (
                                <SingleTile id={color.toString()} style={{backgroundColor: `hsl(${color}, 50%, 50%)`}} innerRef={provided.innerRef} provided={provided} color={color}/>
                            )}
                        </Draggable>
                        {provided.placeholder}
                        </div>)}
                    </div>
                )}
            </Droppable>
            <hr/>
            <button id="next-round" onClick={() => setColors(generateColors(10))}>Next Round of Colors</button>
        </DragDropContext>
  );
}

export default GameRow;
