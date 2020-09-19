import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import decksReducer from "./decksReducer";
import selectedDeckReducer from "./selectedDeckReducer";
import studySessionReducer from './studySessionReducer';

export default combineReducers({
    auth: authReducer,
    decks: decksReducer,
    selectedDeck: selectedDeckReducer,
    studySession: studySessionReducer,
    errors: errorReducer
});