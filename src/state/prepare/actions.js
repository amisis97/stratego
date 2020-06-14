import { socketApi } from '../../api/socket';

export const SET_FIGURE = 'SET_FIGURE';
export const GRAB_FIGURE = 'GRAB_FIGURE';
export const REMOVE_FROM_SET = 'REMOVE_FROM_SET';
export const CREATE_ROOM = 'CREATE_ROOM';
export const RESET_PREPARE = 'RESET_PREPARE';


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

export const createRoom = state => {
    return ({
        type: CREATE_ROOM,
        payload: state
    });
}

export const resetPrepare = () => {
    return ({
        type: RESET_PREPARE
    });
}