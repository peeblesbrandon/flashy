const express = require('express');
const router = express.Router();
const passport = require('passport');

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// add some input validation functions here??

// load mongoose decks model
const Decks = require('../../models/deck.model');

// @route GET api/decks/getUserDecks
// @desc return array of decks created or saved by user
// @access private
router.get('/getDecksByUser', passport.authenticate('jwt', { session: false }), (req, res) => {
    // query for array of all decks associated w/ user 
    Decks.find({ authorId: req.user.id }).then(decks => {
        // return res.status(200).json({ decks: decks })
        // sample data to return
        const decksData = [{ id: 0, title: 'Spanish vocab' }, { id: 1, title: 'Data structures 101' }, { id: 2, title: 'Greek mythology' }];
        return res.status(200).json({ decks: decksData })
    })
    .catch(err => { 
        return res.status(500).json({ msg: 'error querying database'}); 
    });
});

module.exports = router;