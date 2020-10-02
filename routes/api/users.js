const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const starterDeck = require('./starterDeck.json');

// proxy routing
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// load data input validation functions
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// load mongoose models
const User = require('../../models/user.model');
const Deck = require('../../models/deck.model');

// @route POST api/users/register
// @desc register user
// @access public
router.post('/register', (req, res) => {
    // validate form data 
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    console.log(req.body.email);
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: 'Email already exists' });
        } else {
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                hash: req.body.password
            });

            // hash password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.hash, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.hash = hash;
                    // save user, and then create starter/tutorial deck using new userId 
                    var userPromise = newUser.save();
                    var deckPromise = userPromise.then(user =>{
                        const newDeck = new Deck(starterDeck);
                        newDeck.authorId = user._id;
                        return newDeck.save();
                    });                      
                    // return saved user
                    Promise.all([userPromise, deckPromise]).then(([user, deck]) => {
                        return res.status(201).json(user);
                    })
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
            return res.status(404).json({ emailnotfound: 'Email invalid or unregistered' });
        }
        // compare passwords
        bcrypt.compare(password, user.hash).then(isMatch => {
            if (isMatch) {
                // passwords matched
                // create JWT payload
                const payload = {
                    _id: user._id,
                    username: user.username
                };

                // sign token
                jwt.sign(
                    payload,
                    process.env.secretOrKey,
                    {
                        expiresIn: 86400 // 1 day in seconds
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
                    .json({ passwordIncorrect: 'Password incorrect' });
            }
        });
    });
});

module.exports = router;
