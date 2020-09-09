import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};
const composeEnhancer = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;
const middleware = composeEnhancer(applyMiddleware(thunk));

const store = createStore(
    rootReducer,
    initialState,
    middleware
);

export default store;