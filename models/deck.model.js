const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const Schema = mongoose.Schema;

const deckSchema = new Schema({
    title: { type: String, required: true }, 
    description: { type: String, required: false },
    authorId: { type: ObjectId, required: true },
    cards: [],
    private: { type: Boolean, required: true }
}, { timestamps: true });

const Deck = mongoose.model('Deck', deckSchema);

module.exports = Deck;