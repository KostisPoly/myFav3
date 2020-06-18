const validator = require('validator');
const isEmpty = require('lodash/isEmpty');

module.exports = function validateShows(data) {
    let errors = {};
    console.log(data);
    data.name = !isEmpty(data.name) ? data.name : '';
    data.id = !isEmpty(data.id) ? data.id : '';
    data.image = !isEmpty(data.image) ? data.image : {};
    data.image.medium = !isEmpty(data.image.medium) ? data.image.medium : '';
    data.image.original = !isEmpty(data.image.original) ? data.image.original : '';
    data.language = !isEmpty(data.language) ? data.language : '';
    data.genres = !isEmpty(data.genres) ? data.genres : '';
    data.network = !isEmpty(data.network) ? data.network : '';
    data.officialSite = !isEmpty(data.officialSite) ? data.officialSite : '';
    data.premiered = !isEmpty(data.premiered) ? data.premiered : '';
    data.rating = !isEmpty(data.rating) ? data.rating : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.summary = !isEmpty(data.summary) ? data.summary : '';
    data.url = !isEmpty(data.url) ? data.url : '';

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