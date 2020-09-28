import React, { Component } from 'react';
import { Link, withRouter, Redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDeckById, cloneDeck } from '../../actions/selectedDeckActions';
import { getDecks } from '../../actions/deckActions';
import './Deck.css';

class Deck extends React.Component {
    handleDeckClick = (e) => {
        this.props.history.push(`/view/${this.props.id}`);
    }  
    
    handleStartClick = (e) => {
        e.stopPropagation();
        this.props.history.push(`/study/${this.props.id}`);
    }

    handleCloneClick = (e) => {
        e.stopPropagation();
        this.props.cloneDeck(this.props.deck);
        this.props.getDecks();
        this.props.history.push('/dashboard');
    }

    render() {
        console.log(this.props.deck)
        return (
            // <div className="card small hoverable rounded grey valign-wrapper lighten-3 z-depth-2 col grid-gap">
            <div className="col s12 m6 l4" >
                <div className="paper card-panel rounded grey lighten-3 col s12 row" style={{ padding: "2rem 1rem" }} onClick={this.handleDeckClick}>
                    {this.props.cloneButton && this.props.deck.authorUsername && 
                        <div className="left left-align col s12" style={{ marginBottom: '10px'}}>
                            <em className="grey-text"><strong>Created by: </strong>{this.props.deck.authorUsername}</em>
                        </div>
                    }
                    <h5 className="left-align float-text truncate col s12" style={{ margin: '1rem 0'}}>{this.props.title}</h5>
                    <br/>
                    <div className="right-align col s12">
                        {this.props.cloneButton &&
                            <i className="material-icons md-24 grey darken-1 white-text z-depth-2" style={{ borderRadius: "50%", marginRight: '1rem', padding: '10px' }} onClick={this.handleCloneClick}>content_copy</i>
                        }
                        <i className="material-icons md-24 grey darken-1 white-text z-depth-2" style={{ borderRadius: "50%", margin: '0', padding: '10px' }} onClick={this.handleStartClick}>play_arrow</i>
                    </div>
                </div>
            </div>
        );
    }
}

Deck.propTypes = {
    getDeckById: PropTypes.func.isRequired,
    selectedDeck: PropTypes.object.isRequired,
    getDecks: PropTypes.func.isRequired,
    cloneDeck: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    selectedDeck: state.selectedDeck
});

export default connect(
    mapStateToProps,
    { getDeckById, cloneDeck, getDecks }
)(withRouter(Deck));