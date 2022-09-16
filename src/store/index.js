import { configureStore } from '@reduxjs/toolkit';

const _getCurrentTiles = 'GET_CURRENT_TILES';
const _getSolution = 'GET_SOLUTION';
// const _updateCurrentTiles = 'UPDATE_CURRENT_TILES';
const _updateSolution = 'UPDATE_SOLUTION';

export const getCurrentTiles = tiles => {
    return {
        type: _getCurrentTiles,
        tiles: tiles
    }
}

export const getSolution = tiles => {
    return {
        type: _getSolution,
        solution: []
    }
}


const reducer = (state = {}, action) => {
    switch(action.type) {
        case _getCurrentTiles:
            return {...state, tiles: action.tiles};
        case _getSolution:
            return {...state, solution: action.solution};
        default:
            return {...state};
    }
}

export const store = configureStore({
    reducer: reducer
})