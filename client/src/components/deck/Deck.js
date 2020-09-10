import React from 'react';
import './Deck.css';

class Deck extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="card-panel rounded grey lighten-3 z-depth-2">
                {this.props.title}
            </div>
        );
    }
}

export default Deck;