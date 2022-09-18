import React from "react";

function SingleTile(props) {
    const [tileColor, setTileColor] = React.useState(props.color);
    const miscProps = {
        ...props.provided.draggableProps, 
        style: {
            backgroundColor: `hsl(${props.color}, 50%, 50%)`,
            ...props.provided.draggableProps.style
        }}
    return (
                <div 
                className="tile" 
                style={{backgroundColor: `hsl(${props.color}, 50%, 50%)`}} 
                id={tileColor}
                {...miscProps}
                {...props.provided.dragHandleProps}
                ref={props.innerRef}>
                </div>
            )
}

export default SingleTile;
