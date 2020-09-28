import axios from 'axios';
import {
    GET_ERRORS,
    CLEAR_ERRORS,
    GET_PUBLIC_DECKS,
    PUBLIC_DECKS_LOADING,
    SEARCH_DECKS
} from './types';

export const getPublicDecks = () => dispatch => {
    dispatch(setPublicDecksLoading());
    axios
        .get('api/decks/')
        .then(res => {
            dispatch({
                type: GET_PUBLIC_DECKS,
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
        dispatch(setPublicDecksLoading());
        axios
            .get(`api/decks/search/${query_str}`)
            .then(res => {
                dispatch({
                    type: SEARCH_DECKS,
                    payload: res.data.data
                });
                dispatch({
                    type: CLEAR_ERRORS
                });
            })
            .catch(err => {
                console.log(err)
            })
    }    
}

export const setPublicDecksLoading = () => {
    return {
        type: PUBLIC_DECKS_LOADING
    };
};