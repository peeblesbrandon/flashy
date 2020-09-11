const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const Schema = mongoose.Schema;

const deckSchema = new Schema({
    title: { type: String, required: true }, 
    description: { type: String, required: false },
    authorId: { type: ObjectId, required: true },
    cards: [{
        prompt: { type: String, required: false, default: '' },
        answer: { type: String, required: false, default: '' },
        isLearned: { type: Boolean, required: false, default: false }
    }],
    private: { type: Boolean, required: true }
}, { timestamps: true });

const Deck = mongoose.model('Deck', deckSchema);

module.exports = Deck;