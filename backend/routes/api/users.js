const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const keys = require('../../config/keys');

// load data input validation functions
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// load mongoose user model
const User = require('../../models/user.model');

// @route POST api/users/register
// @desc register user
// @access public
router.post('/register', (req, res) => {
    // validate form data 
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: 'Email already exists' });
        } else {
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });

            // hash password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// @route POST api/users/login
// @desc login user and return JWT token
// @access public
router.post('/login', (req, res) => {
    // validate form data
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // lookup user
    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json({emailnotfound: 'Email not found'});
        }
    });

    // compare passwords
    bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
            // passwords matched
            // create JWT payload
            const payload = {
                id: user.id,
                username: user.username
            };
            
            // sign token
            jwt.sign(
                payload,
                process.env.secretOrKey,
                {
                    expiresIn: 31556926 // 1 year in seconds
                },
                (err, token) => {
                    res.json({
                        success: true,
                        token: 'Bearer ' + token 
                    });
                }
            );
        } else {
            return res
                .status(400)
                .json({ passwordIncorrect: 'Password incorrect'});
        }
    });
});

module.exports = router;
