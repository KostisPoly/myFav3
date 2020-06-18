const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const validateProfile = require('../../validations/profile');
const validateMovies = require('../../validations/favMovies');
const validateSongs = require('../../validations/favSongs');
const validateShows = require('../../validations/favShows');

router.get('/test', (req, res) => res.json({msg: "Profile works"}));

//Default profile route
router.get('/', passport.authenticate('jwt', { session: false }),  (req, res) => {
    //res.json({msg: "Profile "});
    const errors = {}; //meaningfull errors object various cases
    Profile.findOne({ user: req.user.id })
    .populate('user', ['name', 'avatar'])   //after finding in db user populate profile with user data
    .then( profile => {
        if (!profile) {
            errors.notfound = 'No such profile found';
            return res.status(404).json(errors);
        }
        return res.json(profile);
    })
    .catch( error => res.status(404).json({msg: 'banana!'}));
});

//Public profile route
router.get('/handle/:handle', (req, res) => {
    const errors = {};
    Profile.findOne({ handle: req.params.handle})   //get handle from url
    .populate('user', ['name', 'avatar'])   //after finding in db user populate profile with user data
    .then(profile => {
        if (!profile) {
            errors.noprofile = 'No profile found for specific user';
            res.status(404).json(errors);
        }
        res.status(404).json({});
        //res.json(profile);
    }).catch(error => res.status(404).json(error));
});

//Public profile route
router.get('/user/:userid', (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.params.userid})   //get handle from url
    .populate('user', ['name', 'avatar'])   //after finding in db user populate profile with user data
    .then(profile => {
        if (!profile) {
            errors.noprofile = 'No profile found for specific user';
            res.status(404).json(errors);
        }

        res.json(profile);
    }).catch(() => res.status(404).json({error: 'No profile found for specific user'})); //Custom masg but same with db nonfound
});

//Create or edit profile route
router.post('/', passport.authenticate('jwt', { session: false }),  (req, res) => {
    //res.json({msg: "Profile Create"});
    const { errors, isValid } = validateProfile(req.body);
    
    if (!isValid) {
        return res.status(400).json(errors);
    }
    //get data from profile form
    const profileData = {};
    profileData.user = req.user.id;
    if (req.body.handle) profileData.handle = req.body.handle; 
    if (req.body.age) profileData.age = req.body.age; 
    if (req.body.bio) profileData.bio = req.body.bio; 
    if (req.body.profesion) profileData.profesion = req.body.profesion; 
    
    Profile.findOne({ user: req.user.id })
    .then(profile => {
        //if profile exists in db then edit view else create
        if(profile) {
            Profile.findOneAndUpdate({ user: req.user.id }, {$set: profileData}, { new: true })
            .then(profile => res.json(profile));
        } else {
            //check handle exists
            Profile.findOne({ handle: profileData.handle })
            .then(profile => {
                if (profile) {
                    errors.handle = 'This handle already exists';
                    res.status(400).json(errors);
                }

                //Save to db
                new Profile(profileData).save().then(profile => res.json(profile));
            });
        }
    })
});

//Post Favourites routes
router.post('/movies', passport.authenticate('jwt', { session: false }),  (req, res) => {
    const { errors, isValid } = validateMovies(req.body);
    
    if (!isValid) {
        return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
    .then(profile => {
        const movie = {
            title: req.body.title,
            id: req.body.id,
            year: req.body.year,
            length: req.body.length,
            rating: req.body.rating,
            poster: req.body.poster,
            plot: req.body.plot,
            trailer: req.body.trailer
        }

        //Append to profile favmovie data and save to DB
        profile.favMovies.unshift(movie);
        profile.save().then(profile => res.json(profile));
    })
});

router.post('/songs', passport.authenticate('jwt', { session: false }),  (req, res) => {
    const { errors, isValid } = validateSongs(req.body);
    
    if (!isValid) {
        return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
    .then(profile => {
        const song = {
            title: req.body.title,
            id: req.body.id,
            preview: req.body.preview,
            duration: req.body.duration,
            artist: {
                name: req.body.artist.name,
                id: req.body.artist.id,
                picture: req.body.artist.picture
            },
            album: {
                title: req.body.album.title,
                id: req.body.album.id,
                cover: req.body.album.cover,
                tracklist: req.body.album.tracklist,
                released: req.body.album.released
            }
        }

        //Append to profile favsong data and save to DB
        profile.favSongs.unshift(song);
        profile.save().then(profile => res.json(profile));
    })
});

router.post('/shows', passport.authenticate('jwt', { session: false }),  (req, res) => {
    const { errors, isValid } = validateShows(req.body);
    
    if (!isValid) {
        return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
    .then(profile => {
        const show = {
            name: req.body.name,
            id: req.body.id,
            genres: req.body.genres,
            network: req.body.network,
            officialSite: req.body.officialSite,
            rating: req.body.rating,
            language: req.body.language,
            image: req.body.image,
            premiered: req.body.premiered,
            status: req.body.status,
            summary: req.body.summary,
            url: req.body.url
        }

        //Append to profile favshow data and save to DB
        profile.favShows.unshift(show);
        profile.save().then(profile => res.json(profile));
    })
});

//Delete routes
router.delete('/movies/:movie', passport.authenticate('jwt', { session: false }),  (req, res) => {
    
    Profile.findOne({ user: req.user.id })
    .then(profile => {
        //Find by params and remove from array then update DB
        const removeMovie = profile.favMovies
            .map(item => item.id)
            .indexOf(req.params.movie);

        profile.favMovies.splice(removeMovie, 1);
        profile.save().then(profile => res.json(profile));
    }).catch(error => res.status(404).json(error));
});

router.delete('/songs/:song', passport.authenticate('jwt', { session: false }),  (req, res) => {
    
    Profile.findOne({ user: req.user.id })
    .then(profile => {
        //Find by params and remove from array then update DB
        const removeSong = profile.favSongs
            .map(item => item.id)
            .indexOf(req.params.song);

        profile.favSongs.splice(removeSong, 1);
        profile.save().then(profile => res.json(profile));
    }).catch(error => res.status(404).json(error));
});

router.delete('/shows/:show', passport.authenticate('jwt', { session: false }),  (req, res) => {
    
    Profile.findOne({ user: req.user.id })
    .then(profile => {
        //Find by params and remove from array then update DB
        const removeShow = profile.favShows
            .map(item => item.id)
            .indexOf(req.params.show);

        profile.favShows.splice(removeShow, 1);
        profile.save().then(profile => res.json(profile));
    }).catch(error => res.status(404).json(error));
});

module.exports = router;