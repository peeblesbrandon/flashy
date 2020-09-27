const express = require('express');
const router = express.Router();
const passport = require('passport');
const { ObjectId } = require('mongodb');

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// add some input validation functions here??

// load mongoose models
const Deck = require('../../models/deck.model');
const e = require('express');

// @route GET api/decks/
// @desc return array of publicly viewable decks
// @access private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Deck.find({ private: false })
        .then(decks => {
            if (decks) {
                return res.status(200).json({ data: decks })
            } else {
                return res.status(204).json({ data: [] })
            }
        })
        .catch(err => {
            return res.status(500).json({ errors: 'error querying database', msg: err });
        });
});

// @route GET api/decks/search/:q
// @desc search for and return array of public decks matching the query string
// @access private
router.get('/search/:q', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.params);
    Deck.find({ private: false, 
            $text: { 
                $search: req.params.q
            } 
        })
        .then(decks => {
            console.log(decks)
            if (decks && decks.length > 0) {
                return res.status(200).json({ data: decks })
            } else {
                // if no results, perform partial substring search on title 
                Deck.find({
                    private: false,
                    title: {
                        $regex: req.params.q, $options: 'i'
                    }
                })
                .then(decks => {
                    if (decks && decks.length > 0) {
                        return res.status(200).json({ data: decks })
                    } else {
                        return res.status(204).json({ data: [] })
                    }
                })
                .catch(err => {
                    console.log(err)
                    return res.status(500).json({ errors: 'error querying database', msg: err });
                })
            }
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({ errors: 'error querying database', msg: err });
        });
});

// @route GET api/decks/me
// @desc return array of decks associated with user based on auth header
// @access private
router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    Deck.find({ authorId: req.user._id })
        .then(decks => {
            if (decks) {
                return res.status(200).json({ data: decks })
            } else {
                return res.status(204).json({ data: [] })
            }
        })
        .catch(err => {
            return res.status(500).json({ errors: 'error querying database', msg: err });
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
// @desc return deck by id (if user has proper auth or deck set to public) 
// @access private
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Deck.findOne({ _id: req.params.id })
        .then(deck => {
            if (deck.private === false) {
                res.status(200).json(deck);
            } else if (deck.authorId === req.params.id) {
                res.status(200).json(deck);
            } else if (deck.authorId !== req.params.id && deck.private) {
                res.status(403).json({ errors: "access denied" })
            }
        })
        .catch(err => {
            return res.status(404).json({ errors: { deck: 'not found' } });
        });
});

// @route DELETE api/decks/:id
// @desc delete deck by id 
// @access private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Deck.deleteOne({ authorId: req.user._id, _id: req.params.id })
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
    Deck.findOne({ authorId: req.user._id, _id: req.params.id })
        .then(deck => {
            if (!deck) {
                return res.status(404).json({ success: false, errors: { deck: 'not found' } });
            } else {
                if (req.body.hasOwnProperty('title')) { deck.title = req.body.title };
                if (req.body.hasOwnProperty('description')) { deck.description = req.body.description };
                if (req.body.hasOwnProperty('cards')) { deck.cards = req.body.cards };
                if (req.body.hasOwnProperty('private')) { deck.private = req.body.private };
                deck.save()
                    .then(deck => {
                        return res.status(200).json({ success: true, updatedDeck: deck });
                    })
                    .catch(err => {
                        return res.status(500).json({ success: false, errors: { saveFailed: 'Server failed to save updates', msg: err } });
                    });

            }
        })
        .catch(err => {
            return res.status(404).json({ success: false, errors: { msg: err } });
        });
});

// @route POST api/decks/:id/cards
// @desc push new card(s) to a deck's cards array
// @expects array of card objects { prompt, answer, isLearned }
// @access private
router.post('/:id/cards', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (!req.body.cards) {
        return res.status(400).json({ success: false, errors: { msg: 'cards field cannot be empty' } });
    } else if (!(req.body.cards instanceof Array)) {
        return res.status(400).json({ success: false, errors: { msg: 'expected array of cards' } });
    }
    Deck.updateOne({ authorId: req.user._id, _id: req.params.id },
                    { $push: { cards: { $each: req.body.cards } } },
                    (err, result) => {
                        if (err) {
                            return res.status(400).json({ success: false, errors: { msg: err } });
                        } 
                        return res.status(200).json({ success: true, result: result });
                    }); 
});

// @route PATCH api/decks/:id/cards/:cardId
// @desc modify card by its id
// @expects all fields for card object
// @access private
router.patch('/:id/cards/:cardId', passport.authenticate('jwt', { session: false }), (req, res) => {
    Deck.updateOne({ authorId: req.user._id, _id: req.params.id, 'cards._id': req.params.cardId }, 
        {$set:
            {
                'cards.$.prompt': req.body.prompt,
                'cards.$.answer': req.body.answer,
                'cards.$.isLearned': req.body.isLearned
            }
        }, 
        (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, errors: { msg: err } });
        }
        return res.status(200).json({ success: true, result: result });
    });
});

// @route DELETE api/decks/:id/cards/:cardId
// @desc delete card by its id
// @access private
router.delete('/:id/cards/:cardId', passport.authenticate('jwt', { session: false }), (req, res) => {
    Deck.updateOne({ authorId: req.user._id, _id: req.params.id },
        { $pull: { cards: { _id: req.params.cardId } } },
        (err, result) => {
            if (err) {
                return res.status(500).json({ success: false, errors: { msg: err } });
            }
            return res.status(200).json({ success: true, result: result });
        });
});

module.exports = router;