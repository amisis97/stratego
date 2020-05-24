export const SET_PLAYER_FIELD = 'SET_FIELD';
export const GRAB_FIGURE = 'GRAB_FIGURE';
export const SWITCH_PLAYER = 'SWITCH_PLAYER';


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