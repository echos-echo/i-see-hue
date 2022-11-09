import React from "react";

function NextGame(props) {
    return (
        <div id='nextPrompt'>
            <h2>Congrats!</h2>
            <h3>you sorted these colors in {props.moves} moves</h3>
            <button id="next-round" onClick={() => props.handler(props.mode)}>Next Round of Colors</button>
        </div>
    )
}

export default NextGame;