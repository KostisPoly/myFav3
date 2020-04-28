const validator = require('validator');
const isEmpty = require('lodash/isEmpty');
module.exports = function validateLogin(data) {
    let errors = {};
    //Initialize form data field for required fields
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (!validator.isEmail(data.email)) {
        errors.email = 'Is not valid email';
    }

    if (validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }
    
    if (validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

     return {
         errors,
         isValid: isEmpty(errors)
     }
}