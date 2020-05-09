const validator = require('validator');
const isEmpty = require('lodash/isEmpty');

module.exports = function validateMovies(data) {
    let errors = {};
    
    data.title = !isEmpty(data.title) ? data.title : '';
    data.id = !isEmpty(data.id) ? data.id : '';
    data.year = !isEmpty(data.year) ? data.year : '';
    data.length = !isEmpty(data.length) ? data.length : '';
    data.rating = !isEmpty(data.rating) ? data.rating : '';
    data.poster = !isEmpty(data.poster) ? data.poster : '';

    if (validator.isEmpty(data.title)) {
        errors.title = 'Title mot present but required';
    }

    if (validator.isEmpty(data.id)) {
        errors.id = 'ID mot present but required';
    }
    
    if (validator.isEmpty(data.year)) {
        errors.year = 'Year mot present but required';
    }

    if (validator.isEmpty(data.length)) {
        errors.length = 'Length mot present but required';
    }

    if (validator.isEmpty(data.rating)) {
        errors.rating = 'Rating mot present but required';
    }

    if (validator.isEmpty(data.poster)) {
        errors.poster = 'Poster mot present but required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}