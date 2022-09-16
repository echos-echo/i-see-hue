import React from "react";

function SingleTile(props) {
    const [tileColor, setTileColor] = React.useState(props.color);
    return (
        <div className="tile" style={{backgroundColor: `hsl(${props.color}, 50%, 50%)`}} id={tileColor}>
        </div>
    );
}

export default SingleTile;
