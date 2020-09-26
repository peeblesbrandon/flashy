import {
    GET_ERRORS,
    GET_DECKS,
    DECKS_LOADING,
    SEARCH_DECKS,
    CREATE_DECK_START,
    CREATE_DECK_SUCCESS,
    CREATE_DECK_FAILURE
} from '../actions/types';

const initialState = {
    data: {},
    loading: false,
    filtered: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DECKS:
            return {
                ...state,
                data: action.payload,
                loading: false
            };
        case DECKS_LOADING:
            return {
                ...state,
                loading: true
            };
        case SEARCH_DECKS:
            return {
                ...state,
                loading: false,
                filtered: state.data.filter(deck => {
                    return deck.title.toLowerCase().includes(action.payload.toLowerCase())
                })
            };
        default:
            return state;
    }
}