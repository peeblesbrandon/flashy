const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};

    // convert empty fields to strings
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    // check email
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field required';
    } else if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    // check password
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};