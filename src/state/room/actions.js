import { socketApi } from '../../api/socket';

export const CREATE_ROOM = 'CREATE_ROOM';

export const setRoom = state => {
    return ({
        type: CREATE_ROOM,
        payload: state
    });
}