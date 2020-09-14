import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDeckById } from '../../actions/selectedDeckActions';
import Navbar from '../layout/Navbar';
import M from 'materialize-css/dist/js/materialize.min.js';

// components
import Deck from '../deck/Deck';
import LoadingSpinFullScreen from '../loader/LoadingSpinFullScreen';

class DeckViewer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getDeckById();
        let fab = document.querySelector(".fixed-action-btn");
        M.FloatingActionButton.init(fab, {});
    };

    render() {
        const { auth, deck } = this.props;
        return (
            <div>
                <Navbar />
                {/* {decks.loading &&
                    <LoadingSpinFullScreen />
                }
                {!decks.loading &&
                    <div style={{ height: "100vh" }} className="container">
                        <div className="row" style={{ height: "100vh" }}>
                            <div className="col s12 left-align">
                                <h4><b className="red-text text-darken-3" style={{ marginLeft: "1rem" }}>My Decks</b></h4>
                            </div>
                            <div className="col s12 center-align">
                                {decks.data.length <= 0 &&
                                    <p>No decks</p>
                                }
                                {decks.data.length > 0 &&
                                    decks.data.map((deck) =>
                                        <Deck key={deck._id.toString()} title={deck.title} />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                } */}
                <div className="fixed-action-btn">
                    <a className="btn-floating btn-large red darken-3">
                        <i className="large material-icons">add</i>
                    </a>
                </div>
            </div>
        );
    }
}

DeckViewer.propTypes = {
    auth: PropTypes.object.isRequired,
    deck: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    deck: state.decks
});

export default connect(
    mapStateToProps,
    {  }
)(DeckViewer);