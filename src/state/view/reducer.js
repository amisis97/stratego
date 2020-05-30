import { SET_VIEW } from "./actions";

const initialState = 'IN_GAME'; // oldal betoltese eseten => Home.js

export const viewReducer = (state = initialState, action) => {
    const { type, payload } = action
  
    if (type === SET_VIEW) {
      return payload
    }
  
    return state
  }