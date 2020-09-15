import axios from 'axios';
import {
    GET_ERRORS,
    GET_DECK_BY_ID,
    DECK_LOADING,
    SET_SELECTED_DECK,
    GET_SELECTED_DECK
} from './types';

export const getDeckById = (id) => dispatch => {
    dispatch(setDeckLoading());
    axios
        .get(`/api/decks/${id}`)
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
};

export const patchDeckById = (id, deckPatch) => dispatch => {
    dispatch(setDeckLoading());
    axios 
        .patch(`/api/decks/${id}`, deckPatch)
        .then(res => {
            const { updatedDeck } = res.data;
            dispatch({
                type: SET_SELECTED_DECK,
                payload: updatedDeck
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response
            });
        })
}

export const setDeckLoading = () => {
    return {
        type: DECK_LOADING
    };
};