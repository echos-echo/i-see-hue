import React from "react";

function SingleTile(props) {
    const [tileColor, setTileColor] = React.useState(props.color);
    return (
                <div 
                className="tile" 
                style={{backgroundColor: `hsl(${props.color}, 50%, 50%)`}} 
                id={tileColor}
                {...props.provided.draggableProps}
                {...props.provided.dragHandleProps}
                ref={props.innerRef}>
                </div>
            )
}

export default SingleTile;
