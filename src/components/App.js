import React from 'react';
import logo from '../logo.svg';
import './App.css';
import Deck from './Deck.js';

function App() {
  return (
    <div id="userDecks">
      <Deck deckName='Deck 1' />
      <Deck deckName='Deck 2' />
      <Deck deckName='Deck 3' />
    </div>
  );
}

export default App;
