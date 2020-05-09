const validator = require('validator');
const isEmpty = require('lodash/isEmpty');
const isLength = require('lodash/isLength');

module.exports = function validateLogin(data) {
    let errors = {};
    
    //required schema fields -- currently only handle
    data.handle = !isEmpty(data.handle) ? data.handle : '';

    if (!validator.isLength(data.handle, { min: 2, max: 40 } )) {
        errors.handle = 'Handle must be between 2 to 40 characters';
    }

    if (validator.isEmpty(data.handle)) {
        errors.handle = 'Handle is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}