import { CREATE_ROOM } from "./actions";

const initialState = {
  roomId: null
}

export const roomReducer = (state = initialState, action) => {
    const { type, payload } = action
  
    if(type === CREATE_ROOM) {
      return {...state, roomId: payload};
    }
  
    return state;
  }