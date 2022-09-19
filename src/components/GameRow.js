import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SingleTile from './SingleTile';
import {generateColors, checkSolution, sortColors} from '../createGame';
import NextGame from './NextGame';

const _GAME_SIZE = 12;

function GameRow() {
    // initial generated array of all colors
    const [startingColors, setStartingColors] = React.useState(generateColors(_GAME_SIZE));
    // setting the solution array
    const [solution, setSolution] = React.useState(sortColors([...startingColors]));
    // the lowest and highest hue values; tiles not meant to be dragged
    const [firstColor, setFirstColor] = React.useState(Math.min(...startingColors));
    const [lastColor, setLastColor] = React.useState(Math.max(...startingColors));
    const [colors, setColors] = React.useState(startingColors.filter(color => color !== firstColor && color !== lastColor));
    const [moves, setMoves] = React.useState(0);
    // states must be initialized in this order!!!

    // function that handles whenever a tile finishes dragging
    function handleOnDragEnd(result) {
        // condition chechs to see if the draggable was dragged in the DragDropContext area
        // if it was done, nothing in the state changes and tiles return to their positions
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
        setMoves(moves + 1);
    }

    // handles the button that loads the next round of colors; a 'reset' button
    function handleOnClick() {
        setStartingColors(generateColors(_GAME_SIZE)); 
    }
    
    // useEffect that will check the tiles against the solution every time a tile is moved (in colors)
    React.useEffect(() => {
        if (checkSolution(colors, solution.slice(1, solution.length - 1))) document.querySelector('#nextPrompt').style.display = 'flex';
    }, [colors, solution]);

    // useEffect that will reassign the solution, first/last colors, based on the newly generated game
    React.useEffect(() => {
        setSolution(sortColors([...startingColors]));
        setFirstColor(Math.min(...startingColors));
        setLastColor(Math.max(...startingColors));
    }, [startingColors])

    // useEffect that will reassign the main color array used to make <Draggable>
    React.useEffect(() => {
        setColors(startingColors.filter(color => color !== firstColor && color !== lastColor));
        setMoves(0);
    }, [startingColors, firstColor, lastColor]);
    
    return (
        // DragDropContext is the space in which Droppables exist and Draggable can be dropped into
        // cannot next multiple DragDropContexts
        <DragDropContext id='play' onDragEnd={handleOnDragEnd}>
            {/* Droppable is the space in which Draggables can land, a 'target' so to speak */}
            <Droppable droppableId='game-row' direction='horizontal'>
                {provided => (
                    // ONE root element in the return of Droppable's callback argument
                    // provided contains properties inherent to react-beautiful-dnd
                    // it allows styling, reference to html, and draggable specific id-ing, amongst others
                    <div {...provided.droppableProps} ref = {provided.innerRef} id='game-row'>
                        {/* first SingleTile: the firstColor in the row (does not drag or drop) */}
                        <SingleTile color={firstColor}/>
                        {colors.filter(color => color !== firstColor && color !== lastColor).map((color, index) => 
                        <Draggable key={color.toString()} draggableId={color.toString()} isDragDisabled={checkSolution(colors, solution.slice(1, solution.length - 1))} index={index}>
                            {provided => (
                                <SingleTile id={color} innerRef={provided.innerRef} provided={provided} color={color}/>
                            )}
                        </Draggable>)}
                        {/* provided.placeholder creates a placeholder source element wherever you hover over
                        so there are no strange effects and it smoothly drags over other Draggable elements */}
                        {provided.placeholder}
                        {/* last SingleTile: the lastColor in the row (does not drag or drop) */}
                        <SingleTile color={lastColor}/>
                    </div>
                )}
            </Droppable>
            {/* button that will load the next round of colors */}
            <button onClick={handleOnClick}>do hue forfeit?</button>
            <NextGame handler={handleOnClick} moves={moves}/>
        </DragDropContext>
  );
}

export default GameRow;
