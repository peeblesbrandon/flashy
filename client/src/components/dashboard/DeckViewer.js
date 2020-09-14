import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDeckById } from '../../actions/selectedDeckActions';
import Navbar from '../layout/Navbar';
import M from 'materialize-css/dist/js/materialize.min.js';
import './DeckViewer.css';

// components
import LoadingSpinFullScreen from '../loader/LoadingSpinFullScreen';

class DeckViewer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let fab = document.querySelector(".fixed-action-btn");
        M.FloatingActionButton.init(fab, {});

        // let tapTarget = document.querySelectorAll('.tap-target');
        // M.TapTarget.init(tapTarget, {});
    };

    render() {
        const { auth, selectedDeck } = this.props;
        return (
            <div>
                <Navbar />
                {selectedDeck.loading &&
                    <LoadingSpinFullScreen />
                }
                {!selectedDeck.loading &&
                    <div style={{ height: "100vh" }} className="container">
                        <div className="row">
                            <div className="colleft-align">
                                <h4><b className="red-text text-darken-3" style={{ marginLeft: "1rem" }}>{selectedDeck.data.title}</b></h4>
                            </div>
                            <p>Note: this JSON output is a placeholder</p>
                            <pre className="left-align maxLines">{JSON.stringify(selectedDeck.data, undefined, 2)}</pre>
                        </div>
                        <div className="fixed-action-btn" id="deckEditFAB">
                            <a className="btn-floating btn-large red darken-3">
                                <i className="large material-icons">expand_less</i>
                            </a>
                            <ul>
                                <li><a className="btn-floating red lighten-1"><i className="material-icons">mode_edit</i></a></li>
                                <li><a className="btn-floating yellow darken-3"><i className="material-icons">add</i></a></li>
                                <li><a className="btn-floating green darken-2"><i className="material-icons">play_arrow</i></a></li>
                            </ul>
                        </div>
                        {/* <!-- Tap Target Structure --> */}
                        {/* <div class="tap-target" data-target="deckEditFAB">
                                <div class="tap-target-content">
                                    <h5>Tap me for edit options</h5>
                                    <p>I don't work yet :( But, once I do, you can click me to find more options for editing your flashcard decks.</p>
                                </div>
                            </div> */}
                    </div>
                }
            </div>
        );
    }
}

DeckViewer.propTypes = {
    auth: PropTypes.object.isRequired,
    selectedDeck: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    selectedDeck: state.selectedDeck
});

export default connect(
    mapStateToProps,
    {}
)(DeckViewer);