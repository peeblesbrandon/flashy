import React from 'react';
import './Deck.css';

class Deck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deckName: this.props.deckName
        }
    }

    render() {
        return (
            <div className="card rounded">
                {this.state.deckName}
            </div>
        );
    }
}

export default Deck;