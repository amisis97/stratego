import { viewReducer } from "./view/reducer";
import { createStore, applyMiddleware, combineReducers } from "redux"
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { prepareReducer } from "./prepare/reducer";

const rootReducer = combineReducers({
    view: viewReducer,
    prepare: prepareReducer,
})

const logger = createLogger({
    collapsed: true
});

export const configureStore = () => {
    return createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(thunk, logger)))
}