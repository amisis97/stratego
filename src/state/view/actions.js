export const SET_VIEW = 'SET_VIEW';


export const setView = state => {
    return ({
        type: SET_VIEW,
        payload: state
    });
};