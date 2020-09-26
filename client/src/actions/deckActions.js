import axios from 'axios';
import {
    GET_ERRORS,
    CLEAR_ERRORS,
    GET_DECKS,
    DECKS_LOADING,
    SEARCH_DECKS
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

export const searchDecks = (query_str) => dispatch => {
    if (query_str !== '') {
        dispatch(setDecksLoading());
        dispatch({
            type: SEARCH_DECKS,
            payload: query_str
        });
    }    
}

export const setDecksLoading = () => {
    return {
        type: DECKS_LOADING
    };
};