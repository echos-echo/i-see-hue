import React from "react";

function Splash() {
    function clickHandler() {
        document.querySelector('#splash').style.display = 'none';
        document.querySelector('#header').style.display = 'flex';
    }
    return (
        <div id='splash'>
            <img width='50%' src={require('./iseehue.png')} alt='splash screen that says: i see hue, do you?'/>
            <h2>The game is simple:</h2>
            <h3>click and drag (or touch and drag if you have a touchscreen device) the colored tiles until they are in color order</h3>
            <h3>the first and last colors do not move: use the two endpoints to drag your colors into the proper gradient</h3>
            <button onClick={clickHandler}>unmix your hues</button>
            <footer>if you are on a mobile device, please turn your screen to its side for better gameplay</footer>
        </div>
    )
}

export default Splash;