export const SET_PLAYER_FIELD = 'SET_FIELD';
export const GRAB_FIGURE = 'GRAB_FIGURE';
export const SWITCH_PLAYER = 'SWITCH_PLAYER';
export const SELECT_FIGURE = 'SELECT_FIGURE';
export const MOVE_FIGURE = 'MOVE_FIGURE';
export const SET_PLAYER_ID = 'SET_PLAYER_ID';


export const grabFigure = state => {
    return ({
        type: GRAB_FIGURE,
        payload: state
    });
};

export const setPlayerField = state => {
    return ({
        type: SET_PLAYER_FIELD,
        payload: state
    });
}

export const selectFigure = state => {
    return ({
        type: SELECT_FIGURE,
        payload: state
    }); 
}

export const moveFigure = state => {
    return ({
        type: MOVE_FIGURE,
        payload: state
    }); 
}

export const setPlayerId = state => {
    return ({
        type: SET_PLAYER_ID,
        payload: state
    });
}