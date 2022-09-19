import React from "react";

function Splash() {
    function clickHandler() {
        document.querySelector('#splash').style.display = 'none';
        document.querySelector('#header').style.display = 'block';
    }
    return (
        <div id='splash'>
            <h1>Hey this is some div</h1>
            <button onClick={clickHandler}>Click to start game</button>
        </div>
    )
}

export default Splash;