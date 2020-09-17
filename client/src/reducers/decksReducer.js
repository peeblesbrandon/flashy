import {
    GET_ERRORS,
    GET_DECKS,
    DECKS_LOADING,
    CREATE_DECK_START,
    CREATE_DECK_SUCCESS,
    CREATE_DECK_FAILURE
} from '../actions/types';

const initialState = {
    data: {},
    loading: false,
    // newDeckId: undefined,
    // isCreatingDeck: false
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
        // case CREATE_DECK_START:
        //     return {
        //         ...state,
        //         isCreatingDeck: true
        //     }
        // case CREATE_DECK_SUCCESS:
        //     return {
        //         ...state,
        //         isCreatingDeck: false,
        //         newDeckId: action.payload._id
        //     }
        // case CREATE_DECK_FAILURE:
            
        default:
            return state;
    }
}