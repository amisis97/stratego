import { viewReducer } from "./view/reducer";
import { createStore, applyMiddleware, combineReducers } from "redux"
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { prepareReducer } from "./prepare/reducer";
// import { configureStore } from '@reduxjs/toolkit';
import { gameReducer } from "./game/reducer";
import { roomReducer } from "./room/reducer";

const rootReducer = combineReducers({
    view: viewReducer,
    prepare: prepareReducer,
    game: gameReducer,
    room: roomReducer
})

const logger = createLogger({
    collapsed: true
  });
  
  export const configureAppStore = () => {
    return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, logger)))
  }