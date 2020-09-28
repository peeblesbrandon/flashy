import {
    GET_ERRORS,
    GET_PUBLIC_DECKS,
    PUBLIC_DECKS_LOADING,
    SEARCH_DECKS
} from '../actions/types';

const initialState = {
    data: {},
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PUBLIC_DECKS:
            return {
                ...state,
                data: action.payload,
                loading: false
            };
        case PUBLIC_DECKS_LOADING:
            return {
                ...state,
                loading: true
            };
        case SEARCH_DECKS:
            return {
                ...state,
                data: action.payload,
                loading: false,
            };
        default:
            return state;
    }
}