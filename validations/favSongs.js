const validator = require('validator');
const isEmpty = require('lodash/isEmpty');

module.exports = function validateSongss(data) {
    let errors = {};
    
    data.title = !isEmpty(data.title) ? data.title : '';
    data.id = !isEmpty(data.id) ? data.id : '';
    data.preview = !isEmpty(data.preview) ? data.preview : '';
    data.duration = !isEmpty(data.duration) ? data.duration : '';
    data.artist.name = !isEmpty(data.artist.name) ? data.artist.name : '';
    data.artist.id = !isEmpty(data.artist.id) ? data.artist.id : '';
    data.artist.picture = !isEmpty(data.artist.picture) ? data.artist.picture : '';
    data.album.title = !isEmpty(data.album.title) ? data.album.title : '';
    data.album.id = !isEmpty(data.album.id) ? data.album.id : '';
    data.album.cover = !isEmpty(data.album.cover) ? data.album.cover : '';
    data.album.tracklist = !isEmpty(data.album.tracklist) ? data.album.tracklist : '';
    data.album.released = !isEmpty(data.album.released) ? data.album.released : '';

    if (validator.isEmpty(data.title)) {
        errors.title = 'Title mot present but required';
    }

    if (validator.isEmpty(data.id)) {
        errors.id = 'ID mot present but required';
    }
    
    if (validator.isEmpty(data.preview)) {
        errors.preview = 'Review mot present but required';
    }

    if (validator.isEmpty(data.duration)) {
        errors.duration = 'Duration mot present but required';
    }

    if (validator.isEmpty(data.artist.name)) {
        errors.artist.name = 'Artist Name not present but required';
    }

    if (validator.isEmpty(data.artist.id)) {
        errors.artist.id = 'Artist ID not present but required';
    }

    if (validator.isEmpty(data.artist.picture)) {
        errors.artist.picture = 'Artist Picture not present but required';
    }

    if (validator.isEmpty(data.album.title)) {
        errors.album.title = 'Album Title not present but required';
    }

    if (validator.isEmpty(data.album.id)) {
        errors.album.id = 'Album ID not present but required';
    }

    if (validator.isEmpty(data.album.cover)) {
        errors.album.cover = 'Album Cover not present but required';
    }

    if (validator.isEmpty(data.album.tracklist)) {
        errors.album.tracklist = 'Album Tracklist not present but required';
    }

    if (validator.isEmpty(data.album.released)) {
        errors.album.released = 'Album Released not present but required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}