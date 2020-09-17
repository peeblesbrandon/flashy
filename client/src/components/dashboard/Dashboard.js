import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { logoutUser } from '../../actions/authActions';
import { getDecks } from '../../actions/deckActions';
import Navbar from '../layout/Navbar';
import M from 'materialize-css/dist/js/materialize.min.js';
import axios from 'axios';

// components
import Deck from '../deck/Deck';
import LoadingSpinFullScreen from '../loader/LoadingSpinFullScreen';
import CreateDeckDialog from './CreateDeckDialog';

class Dashboard extends Component {
    constructor(props) {
        super();
        this.state = {
            // decks: this.props.decks.data,
            // loading: this.props.decks.loading,
            // newDeckId: undefined,
            // isCreatingDeck: false,
            createDeckDialogOpen: false,
            createDeckDialogError: false,
            createDeckDialogErrMsg: '',
            newTitle: ''
        }
        this.onChange = this.onChange.bind(this);
        this.handleDeckCreateOpen = this.handleDeckCreateOpen.bind(this);
        this.handleDeckCreateClose = this.handleDeckCreateClose.bind(this);
        this.handleDeckCreate = this.handleDeckCreate.bind(this);
    }

    componentDidMount() {
        this.props.getDecks();
        let fab = document.querySelector(".fixed-action-btn");
        M.FloatingActionButton.init(fab, {});
    };

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    handleDeckCreateOpen = () => {
        this.setState({
            createDeckDialogOpen: true,
            createDeckDialogError: false,
            createDeckDialogErrMsg: '',
            newTitle: ''
        });
    };

    handleDeckCreateClose = () => {
        this.setState({
            createDeckDialogOpen: false,
            createDeckDialogError: false,
            createDeckDialogErrMsg: '',
            newTitle: ''
        });
    };

    handleDeckCreate = (i, e) => {
        const newTitle = this.state.newTitle.trim();
        if (newTitle === '') {
            this.setState({
                createDeckDialogError: true,
                createDeckDialogErrMsg: 'Must enter a title',
                newTitle: ''
            });
        } else {
            axios
                .post(`/api/decks`, {title: newTitle})
                .then(res => {
                    this.props.history.push(`/view/${res.data._id}`);
                })
                .catch(err => {
                    this.setState({
                        createDeckDialogError: true,
                        createDeckDialogErrMsg: 'Failed to create deck. Please try again.',
                    });
                });
        }
    }

    render() {
        const { auth, decks } = this.props;
        return (
            <div>
                <Navbar />
                {decks.loading &&
                    <LoadingSpinFullScreen />
                }
                {!decks.loading &&
                    <div>
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
                                            <Deck key={deck._id} id={deck._id} title={deck.title} />
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="fixed-action-btn" onClick={this.handleDeckCreateOpen}>
                            <a className="btn-floating btn-large red darken-3 z-depth-3">
                                <i className="large material-icons">add</i>
                            </a>
                        </div>
                        <CreateDeckDialog
                            newTitle={this.state.newTitle}
                            error={this.state.createDeckDialogError}
                            errorMsg={this.state.createDeckDialogErrMsg}
                            handleChange={this.onChange}
                            open={this.state.createDeckDialogOpen}
                            handleOpen={this.handleDeckCreateOpen}
                            handleClose={this.handleDeckCreateClose}
                            handleDeckCreate={this.handleDeckCreate}
                        />
                    </div>
                }
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