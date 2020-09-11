import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { logoutUser } from '../../actions/authActions';
import { getDecks } from '../../actions/deckActions';
import Navbar from '../layout/Navbar';

// components
import Deck from '../deck/Deck';

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getDecks();
    };

    render() {
        const { auth, decks } = this.props;
        return (
            <div>
                <Navbar />
                <div style={{ height: "100vh" }} className="container valign-wrapper">
                    <div className="row">
                        <div className="col s12 center-align">
                            <h4>
                                <b>Hey there,</b> {auth.user.username}
                                <p className="flow-text grey-text text-darken-1">
                                    You are logged into <span style={{ fontFamily: "monospace" }}>flashy</span> 👏
                                </p>
                            </h4>
                        </div>
                        <div className="col s12 center-align" style={{ marginTop: "1rem" }}>
                            {decks.loading &&
                                <p>Loading...</p>
                            }
                            {decks.data.length <= 0 && !decks.loading &&
                                <p>No decks</p>
                            }
                            {decks.data.length > 0 && !decks.loading &&
                                decks.data.map((deck) =>
                                    <Deck key={deck._id.toString()} title={deck.title} />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    getDecks: PropTypes.func.isRequired,
    decks: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    decks: state.decks
});

export default connect(
    mapStateToProps,
    { getDecks }
)(Dashboard);