const express = require('express');
const router = express.Router();
const passport = require('passport');
const { ObjectId } = require('mongodb');

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// add some input validation functions here??

// load mongoose models
const Deck = require('../../models/deck.model');

// @route GET api/decks/
// @desc return array of decks associated with user based on auth header
// @access private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Deck.find({ authorId: req.user._id })
        .then(decks => {
            if (decks) {
                return res.status(200).json({ data: decks })
            } else {
                return res.status(204).json({ data: decks })
            }
        })
        .catch(err => { 
            return res.status(500).json({ errors: 'error querying database'}); 
        });
});

// @route POST api/decks/
// @desc create new deck (blank by default) and return it
// @access private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const newDeck = new Deck({
        title: req.body.title,
        description: req.body.description,
        authorId: req.user._id,
        cards: req.body.cards ? req.body.cards : [],
        private: req.body.private ? req.body.private : true
    });

    newDeck
        .save()
        .then(deck => res.status(201).json(deck))
        .catch(err => console.log(err));
});

// @route GET api/decks/:id
// @desc return deck by id 
// @access private
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Deck.findOne({ authorId: req.user._id, _id: req.params.id })
        .then(deck => {
            return res.status(200).json(deck);
        })
        .catch(err => {
            return res.status(404).json({ errors: { deck: 'not found' } });
        });
});

// @route DELETE api/decks/:id
// @desc delete deck by id 
// @access private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Deck.findOneAndDelete({ authorId: req.user._id, _id: req.params.id })
        .then(deck => {
            if (!deck) {
                return res.status(404).json({ success: false, errors: { deck: 'not found' } });
            } else {
                return res.status(200).json({ success: true, deletedDeck: deck });
            }
        })
        .catch(err => {
            return res.status(404).json({ success: false, errors: { deck: 'not found', msg: err } });
        });
});

// @route PATCH api/decks/:id
// @desc update deck's changeable fields by id with req.body content 
// @note does not allow individual card updates, only array replacement - use api/decks/:id/cards/:id instead
// @access private
router.patch('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const filter = { authorId: req.user._id, _id: req.params.id };
    const update = {};
    if (req.body.title) { update.title = req.body.title };
    if (req.body.description) { update.description = req.body.description };
    if (req.body.cards) { update.cards = req.body.cards };
    if (req.body.private) { update.private = req.body.private };s
    
    Deck.findOneAndUpdate()
        .then(deck => {
            if (!deck) {
                return res.status(404).json({ success: false, errors: { deck: 'not found' } });
            } else {
                return res.status(200).json({ success: true, updatedDeck: deck });
            }
        })
        .catch(err => {
            return res.status(404).json({ success: false, errors: { msg: err } });
        });
});



module.exports = router;