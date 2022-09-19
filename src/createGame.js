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
        // eslint-disable-next-line
        while (colorArray.some(color => Math.abs(color - randomHue) <= 5 )) {
            randomHue = Math.round(Math.random() * 255);
        }
        // add the new, random hue to our array of colors
        colorArray.push(randomHue);
        tileNumbers--;
    }
    return colorArray;
}

// creates the solution array given an array of random colors
// it WILL sort the array in place AND return a new array,
// so please be sure to pass in a new array with the values, not the original array
export const sortColors = colors => {
    return colors.sort((a, b) => a - b);
}

// passes in the current array of tiles and the solution array
// returns true or false
export const checkSolution = (current, solution) => {
    return solution.every((tile, ind) => tile === current[ind]);
}