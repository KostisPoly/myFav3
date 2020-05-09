const validator = require('validator');
const isEmpty = require('lodash/isEmpty');

module.exports = function validateShows(data) {
    let errors = {};
    
    data.name = !isEmpty(data.name) ? data.name : '';
    data.id = !isEmpty(data.id) ? data.id : '';
    

    if (validator.isEmpty(data.name)) {
        errors.name = 'Show name not present but required';
    }

    if (validator.isEmpty(data.id)) {
        errors.id = 'Show ID not present but required';
    }
    

    return {
        errors,
        isValid: isEmpty(errors)
    }
}