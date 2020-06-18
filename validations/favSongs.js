const validator = require('validator');
const isEmpty = require('lodash/isEmpty');

module.exports = function validateSongs(data) {
    let errors = {};
    
    data.title = !isEmpty(data.title) ? data.title : '';
    data.id = !isEmpty(data.id) ? data.id : '';
    data.preview = !isEmpty(data.preview) ? data.preview : '';
    data.duration = !isEmpty(data.duration) ? data.duration : 0;
    data.link = !isEmpty(data.link) ? data.link : '';
    data.rank = !isEmpty(data.rank) ? data.rank : 0;
    data.explicit = !isEmpty(data.explicit) ? data.explicit : 0;
    data.artist.name = !isEmpty(data.artist.name) ? data.artist.name : '';
    data.artist.id = !isEmpty(data.artist.id) ? data.artist.id : '';
    data.artist.link = !isEmpty(data.artist.link) ? data.artist.link : '';
    data.artist.pictures = !isEmpty(data.artist.pictures) ? data.artist.pictures : {};
    data.album.title = !isEmpty(data.album.title) ? data.album.title : '';
    data.album.id = !isEmpty(data.album.id) ? data.album.id : '';
    data.album.covers = !isEmpty(data.album.covers) ? data.album.covers : {};
    data.albumTracklist = !isEmpty(data.albumTracklist) ? data.albumTracklist : '';
    data.artistTracklist = !isEmpty(data.artistTracklist) ? data.artistTracklist : '';

    if (validator.isEmpty(data.title)) {
        errors.title = 'Title mot present but required';
    }

    if (validator.isEmpty(data.id)) {
        errors.id = 'ID mot present but required';
    }
    
    // if (validator.isEmpty(data.preview)) {
    //     errors.preview = 'Review mot present but required';
    // }

    // if (validator.isEmpty(data.duration)) {
    //     errors.duration = 'Duration mot present but required';
    // }

    // if (validator.isEmpty(data.artist.name)) {
    //     errors.artist.name = 'Artist Name not present but required';
    // }

    // if (validator.isEmpty(data.artist.id)) {
    //     errors.artist.id = 'Artist ID not present but required';
    // }

    // if (validator.isEmpty(data.artist.picture)) {
    //     errors.artist.picture = 'Artist Picture not present but required';
    // }

    // if (validator.isEmpty(data.album.title)) {
    //     errors.album.title = 'Album Title not present but required';
    // }

    // if (validator.isEmpty(data.album.id)) {
    //     errors.album.id = 'Album ID not present but required';
    // }

    // if (validator.isEmpty(data.album.cover)) {
    //     errors.album.cover = 'Album Cover not present but required';
    // }

    // if (validator.isEmpty(data.album.tracklist)) {
    //     errors.album.tracklist = 'Album Tracklist not present but required';
    // }

    // if (validator.isEmpty(data.album.released)) {
    //     errors.album.released = 'Album Released not present but required';
    // }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}