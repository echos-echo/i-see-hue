import {generateColors, checkSolution, sortColors} from '../createGame';
import React from 'react';
import SingleTile from './SingleTile';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const _GAME_SIZE = 12;

function GameRow() {
    // initial generated array of all colors
    const [startingColors, setStartingColors] = React.useState(generateColors(10));
    // setting the solution array
    const [solution, setSolution] = React.useState(sortColors([...startingColors]));
    // the lowest and highest hue values; tiles not meant to be dragged
    const [firstColor, setFirstColor] = React.useState(Math.min.apply(null, startingColors));
    const [lastColor, setLastColor] = React.useState(Math.max.apply(null, startingColors));
    const [colors, setColors] = React.useState(startingColors.filter(color => color !== firstColor && color !== lastColor));
    // states must be initialized in this order!!!

    function handleOnDragEnd(result) {
        if(!result.destination) return;
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
        // console.dir(solution);
        console.log(firstColor + ' and ' + lastColor)
    }

    function handleOnClick() {
        setStartingColors(generateColors(10)); 
        setSolution(sortColors([...startingColors]));
        setFirstColor(Math.min.apply(null, startingColors));
        setLastColor(Math.max.apply(null, startingColors));
        setColors(startingColors.filter(color => color !== firstColor && color !== lastColor));
    }
    
    React.useEffect(() => {
        if (checkSolution(colors, solution.slice(1, solution.length - 1))) window.alert('congrats');
    }, [colors, solution]);
    
    return (
        <DragDropContext id='play' onDragEnd={handleOnDragEnd}>
            <Droppable droppableId='game-row' direction='horizontal'>
                {provided => (
                    <div {...provided.droppableProps} ref = {provided.innerRef} id='game-row'>
                        <SingleTile color={firstColor}/>
                        {colors.filter(color => color !== firstColor && color !== lastColor).map((color, index) => 
                        <Draggable key={color.toString()} draggableId={color.toString()} isDragDisabled={checkSolution(colors, solution.slice(1, solution.length - 1))} index={index}>
                            {provided => (
                                <SingleTile innerRef={provided.innerRef} provided={provided} color={color}/>
                            )}
                        </Draggable>)}
                        {provided.placeholder}
                        <SingleTile color={lastColor}/>
                    </div>
                )}
            </Droppable>
            <hr/>
            <button id="next-round" onClick={handleOnClick}>Next Round of Colors</button>
        </DragDropContext>
  );
}

export default GameRow;
