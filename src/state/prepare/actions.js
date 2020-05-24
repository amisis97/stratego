export const SET_FIGURE = 'SET_FIGURE';
export const GRAB_FIGURE = 'GRAB_FIGURE';
export const REMOVE_FROM_SET = 'REMOVE_FROM_SET';


export const setFigure = state => {
    return ({
        type: SET_FIGURE,
        payload: state
    });
};

export const grabFigure = state => {
    return ({
        type: GRAB_FIGURE,
        payload: state
    });
}

export const deleteFigure = state => {
    return ({
        type: REMOVE_FROM_SET,
        payload: state
    });
}