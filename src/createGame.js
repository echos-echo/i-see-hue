// *** FUNCTIONS TO INITIALIZE GAME BEGINS HERE ***

// generates an array of random colors, by hue value
// the array has the number of tileNumbers, provided when invoked
export const generateColors = tileNumbers => {
    const colorArray = [];
    // runs if there are still tiles left to generate a color for
    while (tileNumbers > 0) {
        // initializing a random hue...
        let randomHue = Math.round(Math.random() * 255);
        // if the random hue already exists in our array, keep randomizing until the value does not already exist
        while (colorArray.includes(randomHue)) {
            randomHue = Math.round(Math.random() * 255);
        }
        // add the new, random hue to our array of colors
        colorArray.push(randomHue);
        tileNumbers--;
    }
    return colorArray;
}

// generates a single tile element of the color argument provided
export const generateTile = color => {
    // tile color is determined in HSV color, with a set saturation and value of 50%
    // the id is important; will refer to it later when fetching the game state
    return `<div class='tile' style='background-color: hsl(${color}, 50%, 50%)' id='${color}'></div>`
}

// clears the previous row so the new row of color tiles can append
// *childe is not a typo, it's just an inside joke. sorry.
export const deleteChilde = (gameRow) => {
    while(gameRow.firstChild) {
        gameRow.removeChild(gameRow.lastChild);
    }
}

// initializes the row of colors to sort
export const makeBoard = () => {
    const rowSize = 10;     // how many tiles will render
    const randomColors = generateColors(rowSize);           // the array of random hues
    const firstColor = Math.min.apply(null, randomColors);  // the lowest hue value: first child
    const lastColor = Math.max.apply(null, randomColors);   // the highest hue value: last child
    
    // grabbing the div where the tiles will render
    const gameRow = document.getElementById('game-zone');
    // clears any previous color tiles
    deleteChilde(gameRow);
    
    // appends the lowest hue first
    const firstTile = document.createElement('div');
    firstTile.innerHTML = generateTile(firstColor);
    gameRow.appendChild(firstTile);
    
    // creates and appends a color tile to the game-zone div
    randomColors.forEach(color => {
        // absolutely do NOT create and append and element if it is equal to the first or last colors
        if (color !== firstColor && color !== lastColor) {
            const colorTile = document.createElement('div');
            colorTile.innerHTML = generateTile(color);
            // adding an additional class ONLY to the tiles that are not start or end
            // start/end tiles will stay in place, moveable-tiles in between can be dragged/moved
            colorTile.firstChild.classList.add('moveable-tile');
            colorTile.firstChild.draggable = true;
            gameRow.appendChild(colorTile);
        }
    });
    
    // finally, append the last color to the end
    const lastTile = document.createElement('div');
    lastTile.innerHTML = generateTile(lastColor);
    gameRow.appendChild(lastTile);
    
    // we want to access the colors outside of the board, but AFTER it is made
    // because the colors are randomized on every re-render of the game
    return randomColors;
}