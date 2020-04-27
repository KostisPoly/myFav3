const express = require('express');
const router = express.Router();

const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
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
                    password: reqbody.password
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
module.exports = router;