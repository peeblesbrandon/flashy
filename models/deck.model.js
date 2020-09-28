const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const Schema = mongoose.Schema;

const deckSchema = new Schema({
    title: { type: String, required: true }, 
    description: { type: String, required: false },
    authorId: { type: ObjectId, required: true },
    authorUsername: { type: String, required: false },
    cards: [{
        prompt: { type: String, required: false, default: '' },
        answer: { type: String, required: false, default: '' }
    }],
    private: { type: Boolean, required: true },
    viewCount: { type: Number, required: false, default: 0 }, // num of clicks into deck
    saveCount: { type: Number, required: false, default: 0 }  // num of other users that have saved/duplicated this deck to their own library
}, { timestamps: true });

// deckSchema.index({ title: 'text' });
deckSchema.index({ '$**': 'text' });

const Deck = mongoose.model('Deck', deckSchema);

module.exports = Deck;