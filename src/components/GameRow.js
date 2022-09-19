import {generateColors, checkSolution, sortColors} from '../createGame';
import React from 'react';
import SingleTile from './SingleTile';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function GameRow() {
    const [startingColors, setStartingColors] = React.useState(generateColors(10));
    const [solution, setSolution] = React.useState(sortColors([...startingColors]));
    // the lowest and highest hue values; tiles not meant to be dragged
    const firstColor = Math.min.apply(null, startingColors);
    const lastColor = Math.max.apply(null, startingColors);
    const [colors, setColors] = React.useState(startingColors.filter(color => color !== firstColor && color !== lastColor));

    function handleOnDragEnd(result) {
        // creates a new array using our base state colors
        const newColors = [...colors];
        // the tile we are dragging out of a spot
        const tileToRemove = newColors.splice(result.source.index, 1);
        // inserts the dragged tile into the destination index
        // refer to the result object for more information on how to utilize handleOnDragEnd
        newColors.splice(result.destination.index, 0, tileToRemove[0]);
        // finally, the updated array is set in our state
        setColors(newColors);
        console.dir(newColors);
        console.dir(solution.slice(1, solution.length - 1))
        return checkSolution(colors, solution.slice(1, solution.length - 1)) ? window.alert('congrats') : null;
    }
    
    React.useEffect(() => {
        if (checkSolution(colors, solution.slice(1, solution.length - 1))) window.alert('congrats');
    }, [colors]);
    
    return (
        <DragDropContext id='play' onDragEnd={handleOnDragEnd}>
            <Droppable droppableId='game-row' direction='horizontal'>
                {provided => (
                    <div {...provided.droppableProps} ref = {provided.innerRef} id='game-row'>
                        <SingleTile id={firstColor} color={firstColor} style={{backgroundColor: `hsl(${firstColor}, 50%, 50%)`}}/>
                        {colors.filter(color => color !== firstColor && color !== lastColor).map((color, index) => 
                        <Draggable key={color.toString()} draggableId={color.toString()} isDragDisabled={checkSolution(colors, solution.slice(1, solution.length - 1))} index={index}>
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
            <button id="next-round" onClick={() => {
                setStartingColors(generateColors(10)); 
                setColors(startingColors.filter(color => color !== firstColor && color !== lastColor));
                setSolution(sortColors([...startingColors]))}}>Next Round of Colors</button>
        </DragDropContext>
  );
}

export default GameRow;
