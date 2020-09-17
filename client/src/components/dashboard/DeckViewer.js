import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDeckById, patchDeckById, deleteDeckById } from '../../actions/selectedDeckActions';
import M from 'materialize-css/dist/js/materialize.min.js';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid, Card, CardHeader, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import './DeckViewer.css';

// components
import LoadingSpinFullScreen from '../loader/LoadingSpinFullScreen';
import Navbar from '../layout/Navbar';
import DeleteDeckButton from './DeleteDeckButton';
import DeleteCardButton from './DeleteCardButton';

class DeckViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.selectedDeck.data._id,
            title: this.props.selectedDeck.data.title,
            description: this.props.selectedDeck.data.description,
            private: this.props.selectedDeck.data.private,
            cards: this.props.selectedDeck.data.cards,
            editMode: false,
            deleteCardDialogOpen: false,
            indexToDelete: undefined
        }
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.togglePrivacy = this.togglePrivacy.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
        this.onCardAddClick = this.onCardAddClick.bind(this);
        this.handleCardDeleteOpen = this.handleCardDeleteOpen.bind(this);
        this.handleCardDeleteClose = this.handleCardDeleteClose.bind(this);
        this.handleCardDelete = this.handleCardDelete.bind(this);
        this.handleDeckDelete = this.handleDeckDelete.bind(this);
    }

    componentDidMount() {
        this.props.getDeckById(this.props.match.params.id);
        M.AutoInit();
    };

    componentDidUpdate() {
        M.AutoInit();
    };

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.selectedDeck) !== JSON.stringify(this.props.selectedDeck)) {
            this.setState({
                id: nextProps.selectedDeck.data._id,
                title: nextProps.selectedDeck.data.title,
                description: nextProps.selectedDeck.data.description,
                private: nextProps.selectedDeck.data.private,
                cards: nextProps.selectedDeck.data.cards
            });
        }
    };

    onSaveClick = e => {
        // add error checking here
        e.preventDefault();
        const deckPatch = {
            title: this.state.title,
            description: this.state.description,
            private: this.state.private,
            cards: this.state.cards
        };
        this.props.patchDeckById(this.props.selectedDeck.data._id, deckPatch);
        this.toggleEditMode();
    };

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    handleCardChange = (i, e) => {
        const { name, value } = e.target;
        let cards = [...this.state.cards];
        cards[i] = { ...cards[i], [name]: value };
        this.setState({ cards });
    }

    onCardAddClick = () => {
        console.log('card add');
        const newCard = {
            prompt: '',
            answer: '',
            isLearned: false
        };
        let cards = [...this.state.cards, newCard];
        this.setState({ cards });
    }

    handleCardDeleteOpen = (i) => {
        this.setState({
            deleteCardDialogOpen: true,
            indexToDelete: i
        });
    };

    handleCardDeleteClose = () => {
        this.setState({
            deleteCardDialogOpen: false,
            indexToDelete: undefined
        });
    };

    handleCardDelete = () => {
        const updatedCards = JSON.parse(JSON.stringify(this.state.cards));
        console.log(updatedCards);
        this.setState({ cards: updatedCards });
        this.handleCardDeleteClose();
    }

    handleDeckDelete = () => {
        this.props.deleteDeckById(this.props.selectedDeck.data._id);
        this.props.history.push('/dashboard');
    }

    toggleEditMode = () => {
        if (this.state.editMode) {
            this.setState({
                editMode: false
            });
        } else {
            this.setState({
                editMode: true,
                id: this.props.selectedDeck.data._id,
                title: this.props.selectedDeck.data.title,
                description: this.props.selectedDeck.data.description,
                private: this.props.selectedDeck.data.private,
                cards: this.props.selectedDeck.data.cards,
                deleteCardDialogOpen: false,
                indexToDelete: undefined
            });
        }
    };

    togglePrivacy = e => {
        if (this.state.private) {
            this.setState({ private: false });
        } else {
            this.setState({ private: true });
        }
    }

    render() {
        const { auth, selectedDeck } = this.props;
        return (
            <div>
                <Navbar />
                {selectedDeck.loading === true &&
                    <LoadingSpinFullScreen />
                }
                {selectedDeck.loading === false && selectedDeck.data !== {} &&
                    <div style={{ height: "100vh" }} className="container">
                        {!this.state.editMode &&
                            <div>
                                <div className="row">
                                    <button onClick={this.props.history.goBack} className="col s12 left left-align btn-flat waves-effect">
                                        <i className="material-icons left left-align">keyboard_backspace</i>Back
                                    </button>
                                    <div>
                                        <h5 className="col s11"><b className="left left-align red-text text-darken-3 flow-text truncate">{selectedDeck.data.title}</b></h5>
                                        {selectedDeck.data.private &&
                                            <i className="right-align small material-icons grey-text vertical-align-middle col s1" style={{ padding: "5px" }}>lock</i>
                                        }
                                        {!selectedDeck.data.private &&
                                            <i className="right-align small material-icons grey-text vertical-align-middle col s1" style={{ padding: "5px" }}>lock_open</i>
                                        }
                                    </div>
                                    <p className="col s12 grey-text">{selectedDeck.data.description}</p>
                                    <br />
                                    <div className="col s12 center-align">
                                        {selectedDeck.data.cards !== undefined && selectedDeck.data.cards.length <= 0 &&
                                            <p style={{ color: '#aaa' }}>No cards</p>
                                        }
                                        {selectedDeck.data.cards !== undefined && selectedDeck.data.cards.length > 0 &&
                                            selectedDeck.data.cards.map((card, i) =>
                                                <Card key={i} style={{ backgroundColor: '#eee', margin: '1rem', minWidth: 275 }}>
                                                    <CardContent>
                                                        <Typography variant="body1" style={{ whiteSpace: 'pre-line' }} color="textPrimary" gutterBottom>
                                                            {card.prompt}
                                                        </Typography>
                                                        <hr style={{ border: '1px solid #ccc', borderRadius: '1px' }} />
                                                        <Typography variant="body1" style={{ whiteSpace: 'pre-line' }} color="textSecondary" gutterBottom>
                                                            {card.answer}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="fixed-action-btn" id="deckEditFAB">
                                    <a className="btn-floating btn-large red darken-3 z-depth-3">
                                        <i className="large material-icons">expand_less</i>
                                    </a>
                                    <ul>
                                        <li><a className="btn-floating yellow darken-3"><i className="material-icons" onClick={this.toggleEditMode}>mode_edit</i></a></li>
                                        {/* <li><a className="btn-floating yellow darken-3"><i className="material-icons">add</i></a></li> */}
                                        <li><a className="btn-floating green darken-2"><i className="material-icons">play_arrow</i></a></li>
                                    </ul>
                                </div>
                            </div>
                        }
                        {this.state.editMode &&
                            <div>
                                <form noValidate autoComplete="off">
                                    <div className="row">
                                        <button onClick={this.toggleEditMode} className="col s12 left left-align btn-flat waves-effect">
                                            <i className="material-icons left left-align">clear</i>Cancel
                                        </button>
                                    </div>
                                    <div className="valign-wrapper row" style={{ marginTop: "1rem" }}>
                                        <TextField
                                            id="title"
                                            label="Title"
                                            className="col s7 left left-align"
                                            value={this.state.title}
                                            onChange={this.onChange}
                                            InputProps={{ disableUnderline: true }}
                                        />
                                        <div className="switch col s5 right right-align">
                                            <label>
                                                {this.state.private ? 'Private' : 'Public'}
                                                <input
                                                    id="private"
                                                    type="checkbox"
                                                    checked={this.state.private}
                                                    onChange={this.togglePrivacy}
                                                />
                                                <span className="lever"></span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <TextField 
                                            id="description"
                                            label="Description"
                                            value={this.state.description}
                                            className="col s12 left left-align"
                                            style={{ marginBottom: "1rem" }}
                                            multiline
                                            rowsMax={6}
                                            s={12}
                                            onChange={this.onChange}
                                        />
                                        <div className="col s12 center-align">
                                            <DeleteCardButton
                                                open={this.state.deleteCardDialogOpen}
                                                handleClose={this.handleCardDeleteClose}
                                                handleCardDelete={this.handleCardDelete}
                                            />
                                            {this.state.cards.length > 0 &&
                                                this.state.cards.map((card, i) =>
                                                    <Card key={i} style={{ backgroundColor: '#eee', margin: '1rem', minWidth: 275 }}>
                                                        <CardHeader
                                                            style={{ padding: '5px' }}
                                                            action={
                                                                <IconButton onClick={() => this.handleCardDeleteOpen(i)} aria-label="delete">
                                                                    <i className="small material-icons" style={{ padding: '0' }}>delete</i>
                                                                </IconButton>
                                                            }
                                                        />
                                                        <CardContent style={{ paddingTop: '0' }}>
                                                            <TextField
                                                                name="prompt"
                                                                label="Prompt"
                                                                value={this.state.cards[i].prompt}
                                                                className="col s12"
                                                                style={{ marginBottom: "1rem" }}
                                                                multiline
                                                                s={12}
                                                                onChange={this.handleCardChange.bind(this, i)}
                                                            />
                                                            <TextField
                                                                name="answer"
                                                                label="Answer"
                                                                value={this.state.cards[i].answer}
                                                                className="col s12"
                                                                style={{ marginBottom: "1rem" }}
                                                                multiline
                                                                s={12}
                                                                onChange={this.handleCardChange.bind(this, i)}
                                                            />
                                                        </CardContent>
                                                    </Card>
                                                )
                                            }
                                        </div>
                                        <div style={{ margin: '1rem', minWidth: 275 }}>
                                            <Button onClick={this.onCardAddClick} color="default" className="col s12" style={{ color: "#aaa", border: '3px dashed #eee', margin: '1rem 0', padding: '3rem 0' }}>
                                                <i className="material-icons">add</i>
                                            </Button>
                                        </div>
                                        <DeleteDeckButton handleDeckDelete={this.handleDeckDelete} />
                                    </div>
                                    <div className="fixed-action-btn center-align" id="saveFAB">
                                        <a className="btn-floating btn-large blue z-depth-3" onClick={this.onSaveClick}>
                                            <i className="large material-icons">save</i>
                                        </a>
                                    </div>
                                </form>
                            </div>
                        }
                    </div>
                }
            </div>
        );
    }
}

DeckViewer.propTypes = {
    auth: PropTypes.object.isRequired,
    selectedDeck: PropTypes.object.isRequired,
    getDeckById: PropTypes.func.isRequired,
    patchDeckById: PropTypes.func.isRequired,
    deleteDeckById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    selectedDeck: state.selectedDeck
});

export default connect(
    mapStateToProps,
    { getDeckById, patchDeckById, deleteDeckById }
)(withRouter(DeckViewer));