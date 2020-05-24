export const SET_FIGURE = 'SET_FIGURE';
export const GRAB_FIGURE = 'GRAB_FIGURE';


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