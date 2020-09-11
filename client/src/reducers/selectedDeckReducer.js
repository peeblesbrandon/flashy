import {
    GET_DECK_BY_ID,
    DECK_LOADING
} from '../actions/types';

const initialState = {
    data: [],
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DECK_BY_ID:
            return {
                ...state,
                data: action.payload
            };
        case DECK_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}