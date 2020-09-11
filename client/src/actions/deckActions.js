import axios from 'axios';
import {
    GET_ERRORS,
    GET_DECKS,
    DECKS_LOADING
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
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response
            })
        });
};

export const setDecksLoading = () => {
    return {
        type: DECKS_LOADING
    };
};