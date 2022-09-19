import React from "react";

function SingleTile(props) {
    // SingleTile's only purpose is to:
    // - create a div of class tile
    // - make sure the tile is the color passed into props, props.color
    let miscProps = props.provided ? ({
        ...props.provided.draggableProps, 
        ...props.provided.dragHandleProps,
        style: {
            backgroundColor: `hsl(${props.color}, 50%, 50%)`,
            ...props.provided.draggableProps.style
        }}) : {};
    function handleTileShaking(e) {
        e.target.classList.add('shake');
        setTimeout(() => {
            e.target.classList.remove('shake');
        }, 1000)
    }

    return (
                <div 
                className="tile" 
                style={{backgroundColor: `hsl(${props.color}, 50%, 50%)`}}
                {...miscProps}
                ref={props.innerRef}
                onMouseDown={(event) => props.text === 'x' ? handleTileShaking(event) : null}
                >
                    <h2>{props.text}</h2>
                </div>
            )
}

export default SingleTile;
