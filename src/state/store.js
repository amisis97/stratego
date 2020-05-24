import { viewReducer } from "./view/reducer";
import { applyMiddleware, combineReducers } from "redux"
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { prepareReducer } from "./prepare/reducer";
import { configureStore } from '@reduxjs/toolkit';
import { gameReducer } from "./game/reducer";

const rootReducer = combineReducers({
    view: viewReducer,
    prepare: prepareReducer,
    game: gameReducer,
})

const logger = createLogger({
    collapsed: true
});

export const configureAppStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: composeWithDevTools(applyMiddleware(thunk, logger)),
    });
}