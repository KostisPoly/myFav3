const express = require('express');
const router = express.Router();

const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../../config/keys');

const User =  require('../../models/User');

router.get('/test', (req, res) => res.json({msg: "Users works"}));

router.post('/register', (req,  res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json({email: 'Email already exists'})
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
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})   //email: email
        .then(user => {
            //User by email doesnt exist
            if (!user) {
                return res.status(404).json({email: 'Email not found'});
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
                        
                        jwt.sign(payload, secret.secret, { expiresIn: 3600 }, (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            })
                        });
                    } else {
                        return res.status(400).json({password: 'Incorrect password'});
                    }
                });
        });
});
module.exports = router;