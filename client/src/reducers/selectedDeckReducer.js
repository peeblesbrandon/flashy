import {
    GET_DECK_BY_ID,
    DECK_LOADING,
    SET_SELECTED_DECK
} from '../actions/types';

const initialState = {
    data: {},
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DECK_BY_ID:
            return {
                ...state,
                data: action.payload,
                loading: false
            };
        case SET_SELECTED_DECK:
            return {
                ...state,
                data: action.payload,
                loading: false
            }
        case DECK_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}