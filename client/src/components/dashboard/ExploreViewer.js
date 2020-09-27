import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPublicDecks, searchDecks } from '../../actions/exploreActions';
import Navbar from '../layout/Navbar';
import M from 'materialize-css/dist/js/materialize.min.js';
import './ExploreViewer.css';

// components
import Deck from '../deck/Deck';
import LoadingSpinFullScreen from '../loader/LoadingSpinFullScreen';
import { json } from 'body-parser';

class ExploreViewer extends Component {
    constructor(props) {
        super();
        this.state = {
            search_bar: '',
        }
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.props.getPublicDecks();
    };

    shouldComponentUpdate(nextProps) {
        return JSON.stringify(nextProps.publicDecks) 
            !== JSON.stringify(this.props.publicDecks);
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
        if (e.target.id === "search_bar") {
            if (e.target.value !== '') {
                this.props.searchDecks(e.target.value);
            } else {
                this.props.getPublicDecks();
            }
        }
    };

    render() {
        const { auth, publicDecks } = this.props;
        return (
            <div>
                <Navbar />
                    <div>
                        <div style={{ height: "100vh" }} className="container">
                            <div className="row" style={{ height: "100vh" }}>
                                <div className="input-icons input-field">
                                    <i className="icon material-icons md-24 grey-text" style={{ color: "black", marginLeft: "1rem" }}>search</i>
                                    <input className="search-bar" id="search_bar" value={this.state.search_bar} onChange={this.onChange} type="text" placeholder="Search..." />
                                </div>
                                <div className="col s12 left-align">
                                    <h4><b className="red-text text-darken-3" style={{ marginLeft: "1rem" }}>Explore</b></h4>
                                </div>
                                {publicDecks.loading &&
                                    <LoadingSpinFullScreen />
                                }
                                {!publicDecks.loading && publicDecks.data &&
                                    <div className="col s12 center-align">
                                        {publicDecks.data.length <= 0 &&
                                            <p>No decks{this.state.search_bar === '' ? "" : " match your search"}</p>
                                        }
                                        {publicDecks.data.length > 0 &&
                                            publicDecks.data.filter(deck => { return deck.authorId !== auth.user._id }).map(deck =>
                                                <Deck key={deck._id} id={deck._id} title={deck.title} deck={deck} cloneButton={true} handleCloneClick={this.handleCloneClick} />
                                            )
                                        }
                                    </div>
                                }
                                {!publicDecks.loading && !publicDecks.data &&
                                    <div className="col s12 center-align">
                                        <p>No decks{this.state.search_bar === '' ? "" : " match your search"}</p>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}

ExploreViewer.propTypes = {
    auth: PropTypes.object.isRequired,
    getPublicDecks: PropTypes.func.isRequired,
    publicDecks: PropTypes.object.isRequired,
    searchDecks: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    publicDecks: state.publicDecks
});

export default connect(
    mapStateToProps,
    { getPublicDecks, searchDecks }
)(ExploreViewer);