const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const validateProfile = require('../../validations/profile');

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

module.exports = router;