import { configureStore } from '@reduxjs/toolkit';

const _getSolution = 'GET_SOLUTION';
const _updateCurrentTiles = 'UPDATE_CURRENT_TILES';
const _updateSolution = 'UPDATE_SOLUTION';


export const updateCurrentTiles = tiles => {
    return {
        type: _updateCurrentTiles,
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
        case _updateCurrentTiles:
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