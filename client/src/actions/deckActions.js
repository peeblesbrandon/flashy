import axios from 'axios';
import {
    GET_ERRORS,
    CLEAR_ERRORS,
    GET_DECKS,
    DECKS_LOADING,
    // CREATE_DECK_START,
    // CREATE_DECK_SUCCESS
} from './types';

export const getDecks = () => dispatch => {
    dispatch(setDecksLoading());
    axios
        .get('api/decks/')
        .then(res => {
            dispatch({
                type: GET_DECKS,
                payload: res.data.data
            });
            dispatch({
                type: CLEAR_ERRORS
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response
            });
        });
};

// export const createDeck = (title) => dispatch => {
//     dispatch({ type: CREATE_DECK_START });
//     axios
//         .post(`/api/decks`)
//         .then(res => {
//             dispatch({
//                 type: CREATE_DECK_SUCCESS,
//                 payload: res.data
//             });
//             dispatch({
//                 type: CLEAR_ERRORS
//             });
//         })
//         .catch(err => {
//             dispatch({
//                 type: GET_ERRORS,
//                 payload: err
//             });
//         });
//  };

export const setDecksLoading = () => {
    return {
        type: DECKS_LOADING
    };
};