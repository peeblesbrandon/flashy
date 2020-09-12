import React from 'react';
import './Deck.css';

class Deck extends React.Component {
    render() {
        return (
            // <div className="card small hoverable rounded grey valign-wrapper lighten-3 z-depth-2 col grid-gap">
            <div className="col s12 m6 l4">
                <div className="card-panel hoverable rounded grey valign-wrapper lighten-3 z-depth-2 col s12" style={{padding: "2rem 2rem 2rem 2rem"}}>
                    <b className="center-align">{this.props.title}</b>
                </div>
            </div>
        );
    }
}

export default Deck;