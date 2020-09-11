import axios from 'axios';
import {
    GET_ERRORS,
    GET_DECK_BY_ID,
    DECK_LOADING
} from './types';

export const getDeckById = (id) => dispatch => {
    dispatch(setDecksLoading());
    axios
        .get('api/decks/', { query: { id: id } })
        .then(res => {
            dispatch({
                type: GET_DECK_BY_ID,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response
            })
        });

}

export const setDeckLoading = () => {
    return {
        type: DECKS_LOADING
    };
};