import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import decksReducer from "./decksReducer";
import selectedDeckReducer from "./selectedDeckReducer";
import studySessionReducer from './studySessionReducer';
import exploreReducer from "./exploreReducer";

export default combineReducers({
    auth: authReducer,
    decks: decksReducer,
    publicDecks: exploreReducer,
    selectedDeck: selectedDeckReducer,
    studySession: studySessionReducer,
    errors: errorReducer
});