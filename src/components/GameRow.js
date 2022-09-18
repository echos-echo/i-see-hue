import {generateColors, checkSolution, sortColors} from '../createGame';
import React from 'react';
import SingleTile from './SingleTile';
import { updateCurrentTiles, updateSolution } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function GameRow() {
    const dispatch = useDispatch();
    const [colors, setColors] = React.useState(useSelector(state => state.tiles) || generateColors(10));
    const solution = sortColors([...colors]);
    // the lowest and highest hue values; tiles not meant to be dragged
    const firstColor = Math.min.apply(null, colors);
    const lastColor = Math.max.apply(null, colors);

    function handleOnDragEnd(result) {
        // creates a new array using our base state colors
        const newColors = [...colors];
        // the tile we are dragging out of a spot
        const tileToRemove = newColors.splice(result.source.index + 1, 1);
        console.log(tileToRemove + ' removed')
        // inserts the dragged tile into the destination index
        // refer to the result object for more information on how to utilize handleOnDragEnd
        newColors.splice(result.destination.index + 1, 0, tileToRemove[0]);
        // finally, the updated array is set in our state
        setColors(newColors);
        return checkSolution(colors, solution) ? window.alert('congrats') : null;
    }
    
    React.useEffect(() => {
        dispatch(updateSolution(colors));
        dispatch(updateCurrentTiles(colors));
    }, [colors, dispatch]);
    
    return (
        <DragDropContext id='play' onDragEnd={handleOnDragEnd}>
            <Droppable droppableId='game-row' direction='horizontal'>
                {provided => (
                    <div {...provided.droppableProps} ref = {provided.innerRef} id='game-row'>
                        <SingleTile id={firstColor} color={firstColor} style={{backgroundColor: `hsl(${firstColor}, 50%, 50%)`}}/>
                        {colors.filter(color => color !== firstColor && color !== lastColor).map((color, index) => 
                        <Draggable key={color.toString()} draggableId={color.toString()} isDragDisabled={checkSolution(colors, solution)} index={index+1}>
                            {provided => (
                                <SingleTile id={color} style={{backgroundColor: `hsl(${color}, 50%, 50%)`}} innerRef={provided.innerRef} provided={provided} color={color}/>
                            )}
                        </Draggable>)}
                        {provided.placeholder}
                        <SingleTile id={lastColor} color={lastColor} style={{backgroundColor: `hsl(${lastColor}, 50%, 50%)`}}/>
                    </div>
                )}
            </Droppable>
            <hr/>
            <button id="next-round" onClick={() => setColors(generateColors(10))}>Next Round of Colors</button>
        </DragDropContext>
  );
}

export default GameRow;
