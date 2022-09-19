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
    return (
                <div 
                className="tile" 
                style={{backgroundColor: `hsl(${props.color}, 50%, 50%)`}}
                {...miscProps}
                ref={props.innerRef}>
                    <p>{props.color}</p>
                </div>
            )
}

export default SingleTile;
