import React, { Component } from 'react';
import { Link, withRouter, Redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDeckById } from '../../actions/selectedDeckActions';

class Deck extends React.Component {
    onDeckClick = () => {
        this.props.getDeckById(this.props.id);
        this.props.history.push('/view');
    }  
    
    onStartClick = e => {
        this.props.getDeckById(this.props.id);
    }

    render() {
        return (
            // <div className="card small hoverable rounded grey valign-wrapper lighten-3 z-depth-2 col grid-gap">
            <div className="col s12 m6 l4" onClick={this.onDeckClick}>
                <div className="card-panel hoverable rounded grey lighten-3 z-depth-2 col s12" style={{padding: "2rem 2rem 2rem 2rem"}}>
                    <h5 className="left-align float-text truncate">{this.props.title}</h5>
                    <br/>
                    <div className="right-align">
                        <span className="material-icons md-36" onClick={this.onStartClick}>play_arrow</span>
                    </div>
                </div>
            </div>
        );
    }
}

Deck.propTypes = {
    getDeckById: PropTypes.func.isRequired,
    selectedDeck: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    selectedDeck: state.selectedDeck
});

export default connect(
    mapStateToProps,
    { getDeckById }
)(withRouter(Deck));