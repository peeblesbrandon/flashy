import axios from 'axios';
import {
    GET_ERRORS,
    CLEAR_ERRORS,
    GET_DECKS,
    DECKS_LOADING,
    FILTER_DECKS
    // CREATE_DECK_START,
    // CREATE_DECK_SUCCESS
} from './types';

export const getDecks = () => dispatch => {
    dispatch(setDecksLoading());
    axios
        .get('api/decks/me')
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

export const filterDecks = (query_str) => dispatch => {
    if (query_str !== '') {
        dispatch(setDecksLoading());
        dispatch({
            type: FILTER_DECKS,
            payload: query_str
        });
    }    
}

export const setDecksLoading = () => {
    return {
        type: DECKS_LOADING
    };
};