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
        type: String
    },
    bio: {
        type: String
    },
    profesion: {
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
                type: Number
            },
            length: {
                type: String
            },
            rating: {
                type: String
            },
            poster: {
                type: String
            },
            plot: {
                type: String
            },
            trailer: {
                type: String
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
            language: {
                type: String
            },
            image: {
                medium: {
                    type: String
                },
                original: {
                    type: String
                }

            },
            network: {
                type: String
            },
            premiered: {
                type: String
            },
            status: {
                type: String
            },
            summary: {
                type: String
            },
            url: {
                type: String
            }
        }
    ]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);