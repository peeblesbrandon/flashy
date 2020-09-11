import {
    GET_DECKS,
    DECKS_LOADING
} from '../actions/types';

const initialState = {
    data: {},
    loading: false
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
        default:
            return state;
    }
}