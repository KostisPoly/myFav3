const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, //referencing by id user model connect to profile
        ref: 'users'
    },
    handle: {
        type: String,
        required: true,
        max: 40
    },
    age: {
        type: Number
    },
    bio: {
        type: String
    },
    profession: {
        type: String
    },
    favMovies: [
        {
            title: {
                type: String,
                required: true
            },
            id: {
                type: String,
                required: true
            },
            year: {
                type: Number,
                required: true
            },
            length: {
                type: String,
                required: true
            },
            rating: {
                type: String,
                required: true
            },
            poster: {
                type: String,
                required: true
            }    
        }
    ],
    favSongs: [
        {
            title: {
                type: String,
                required: true
            },
            id: {
                type: String,
                required: true
            },
            preview: {
                type: String
            },
            duration: {
                type: String,
                required: true
            },
            artist: {
                name: {
                    type: String,
                    required: true
                },
                id: {
                    type: String,
                    required: true
                },
                picture: {
                    type: String,
                    required: true
                }
            },
            album: {
                title: {
                    type: String,
                    required: true
                },
                id: {
                    type: String,
                    required: true
                },
                cover: {
                    type: String,
                    required: true
                },
                tracklist: {
                    type: String
                },
                released: {
                    type: String
                }
            }    
        }
    ], 
    favShows: [
        {
            name: {
                type: String,
                required: true
            },
            id: {
                type: String,
                required: true
            },
            genres: {
                type: [String]
            },
            officialSite: {
                type: String
            },
            rating: {
                type: String
            },
            imdbId: {
                type: String
            },
            image: {
                type: [String]
            }
        }
    ]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);