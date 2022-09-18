import React from "react";

function SingleTile(props) {
    const [tileColor, setTileColor] = React.useState(props.color);
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
                id={tileColor}
                {...miscProps}
                ref={props.innerRef}>
                </div>
            )
}

export default SingleTile;
