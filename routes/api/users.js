const express = require('express');
const router = express.Router();

const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../../config/keys');
const passport = require('passport');

//Load validation handlers
const validateRegister = require('../../validations/register');
const validateLogin = require('../../validations/login');

//Load Models
const User =  require('../../models/User');

router.get('/test', (req, res) => res.json({msg: "Users works"}));

router.post('/register', (req,  res) => {
    //Return valudation errors
    const { errors, isValid } = validateRegister(req.body); //validation errors
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                //If user with input email exists in cluster
                errors.email = 'Email already exists';
                return res.status(400).json(errors)
            } else {
                const avatar = gravatar.url(req.body.email, {   //initialize gravatar from email input
                    s:  '200',  //size 
                    r: 'pg',    //rating
                    d: 'mm'     //default
                });
                
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar, //avatar: avatar,
                    password: req.body.password
                });

                //Generate password and store to user
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) {
                            throw err;
                        }
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
        })
});
router.post('/login', (req, res) => {
    //Return valudation errors
    const { errors, isValid } = validateLogin(req.body); //validation errors
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
    console.log('Password from req ' + password);
    User.findOne({email})   //email: email
        .then(user => {
            //User by email doesnt exist
            if (!user) {
                errors.email = { email: 'User not found' };
                return res.status(404).json(errors.email);
            }

            //Check Password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        //generate JWT
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar    
                        };
                        
                        jwt.sign(payload, secret.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            })
                        });
                    } else {
                        errors.password = 'Wrong password';
                        return res.status(400).json(errors.password);
                    }
                }).catch(err => console.log(err));
        });
});

router.get('/current', passport.authenticate('jwt', {session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        email: req.user.email,
        name: req.user.name
    });
});
module.exports = router;