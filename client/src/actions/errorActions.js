import {
    // GET_ERRORS,
    CLEAR_ERRORS
} from "./types";

// clear errors
export const clearErrors = dispatch => {
    dispatch({
        type: CLEAR_ERRORS
    });
};
