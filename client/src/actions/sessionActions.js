import axios from 'axios';
import {
    SET_CARDS_START,
    SET_CARDS_SUCCESS,
    SET_CARDS_FAILURE,
    CLEAR_CARDS,
    GET_ERRORS,
    CLEAR_ERRORS
} from "../actions/types";

export const requestAllCards = (id) => dispatch => {
    console.log(id)
    dispatch(setCardsLoading());
    axios
        .get(`/api/decks/${id}`)
        .then(res => {
            dispatch({
                type: SET_CARDS_SUCCESS,
                payload: res.data.cards
            });
            dispatch({
                type: CLEAR_ERRORS
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response
            })
        });
};

export const setIncorrectCards = (cards) => dispatch => {
    dispatch(setCardsLoading());
    if (cards) {
        dispatch({
            type: SET_CARDS_SUCCESS,
            payload: cards
        });
    } else {
        dispatch({
            type: GET_ERRORS,
            payload: 'No cards'
        })
    }
}

export const setCardsLoading = () => {
    return {
        type: SET_CARDS_START
    };
};