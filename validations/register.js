const validator = require('validator');
const isEmpty = require('lodash/isEmpty');
module.exports = function validateRegister(data) {
    let errors = {};

    if (!validator.isLength(data.name, { min: 2, max: 30})) {
        errors.name = 'Name must be between 2 and 30 sharacters';
    }

     return {
         errors,
         isValid: isEmpty(errors)
     }
}