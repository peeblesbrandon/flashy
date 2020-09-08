const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    
    // clean up empty fields for validator
    data.username = !isEmpty(data.username) ? data.username : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    // ensure fields are filled out properly
    if (Validator.isEmpty(data.username)) {
        errors.username = 'Username field is required';
    }
    
    // email check
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    } else if (!Validator.isEmail(data.email)) {
        errors.email = 'Invalid email';
    }
    
    // password check
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Password confirmation is required';
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be between 6 and 30 characters';
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match';
    }

    return {
        errors, 
        isValid: isEmpty(errors)
    };
};