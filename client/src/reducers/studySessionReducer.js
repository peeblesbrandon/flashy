import { 
        SET_CARDS_START,
        SET_CARDS_SUCCESS,
        SET_CARDS_FAILURE,
        CLEAR_CARDS
    } from "../actions/types";

const initialState = {
    cards: [],
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CARDS_START:
            return { 
                ...state,
                loading: true
             };
        case SET_CARDS_SUCCESS:
            return {
                ...state,
                loading: false,
                cards: action.payload
            };
        case SET_CARDS_FAILURE:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}