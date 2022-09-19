import React from "react";

function NextGame(props) {
    function clickHandler() {
        props.handler();
        document.querySelector('#nextPrompt').style.display = 'none';
    }
    return (
        <div id='nextPrompt'>
            <h2>Congrats!</h2>
            <h2>you sorted these colors in {props.clicks} moves</h2>
            <button id="next-round" onClick={clickHandler}>Next Round of Colors</button>
        </div>
    )
}

export default NextGame;