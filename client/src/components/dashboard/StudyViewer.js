import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDeckById } from '../../actions/selectedDeckActions';
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
// import './StudyViewer.css';

// components
import LoadingSpinFullScreen from '../loader/LoadingSpinFullScreen';
import Navbar from '../layout/Navbar';
import selectedDeckReducer from '../../reducers/selectedDeckReducer';

class StudyViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            incorrectCards: [],
            currIndex: 0, // index of current card
            studyIncorrect: false, // when true it will only test user on unlearned cards
            flipped: false,
            completed: false
        }
        this.handleFlipClick = this.handleFlipClick.bind(this);
        this.handleCorrectClick = this.handleCorrectClick.bind(this);
        this.handleWrongClick = this.handleWrongClick.bind(this);
        this.handleRestartAll = this.handleRestartAll.bind(this);
        this.handleRestartIncorrect = this.handleRestartIncorrect.bind(this);
    }

    componentDidMount() {
        this.props.getDeckById(this.props.match.params.id);
    };

    shouldComponentUpdate(nextProps) {
        return true;
        // return (JSON.stringify(nextProps.selectedDeck) !== JSON.stringify(this.props.selectedDeck))
    };

    handleFlipClick = () => {
        this.setState({ flipped: !this.state.flipped })
    };

    handleCorrectClick = () => {
        if (this.state.currIndex === this.props.selectedDeck.data.cards.length - 1) {
            this.setState({ completed: true });
        } else {
            this.setState({ currIndex: this.state.currIndex + 1 })
        }
    };

    handleWrongClick = () => {
        const newArray = JSON.parse(JSON.stringify(this.state.incorrectCards));
        newArray.push(this.props.selectedDeck.data.cards[this.state.currIndex]);

        if (this.state.currIndex === this.props.selectedDeck.data.cards.length - 1) {
            this.setState({ 
                incorrectCards: newArray,
                completed: true 
            });
        } else {
            this.setState({ 
                incorrectCards: newArray,
                currIndex: this.state.currIndex + 1 
            })
        }
    };

    handleRestartAll = () => {

    };

    handleRestartIncorrect = () => {

    }

    render() {
        const { cards, currIndex, filterOutCorrect, flipped, completed } = this.state;
        const { auth, selectedDeck } = this.props;
        console.log(this.state);
        console.log(selectedDeck);
        return (
            <div>
                <Navbar />
                {(selectedDeck.loading === undefined || selectedDeck.loading === true) &&
                    <LoadingSpinFullScreen />
                }
                {selectedDeck.loading === false &&
                    <div style={{ height: "100vh" }} className="container">
                        {!completed &&
                            <div>
                                <div className="row">
                                    <Card style={{ backgroundColor: '#eee', margin: '1rem', minWidth: 275 }} onClick={this.handleFlipClick}>
                                        <CardContent>
                                            <Typography variant="body1" style={{ whiteSpace: 'pre-line' }} color="textPrimary" style={{ padding: "4rem" }} gutterBottom>
                                                {selectedDeck.data && !flipped &&
                                                    selectedDeck.data.cards[currIndex].prompt
                                                }
                                                {selectedDeck.data && flipped &&
                                                    selectedDeck.data.cards[currIndex].answer
                                                }
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </div>
                                <div className="row">
                                    <Button onClick={this.handleWrongClick} color="default" className="col s12" style={{ color: "#aaa", border: '3px dashed #eee', margin: '1rem 0', padding: '3rem 0' }}>
                                        <i className="large material-icons">not_interested</i>
                                    </Button>
                                    <Button onClick={this.handleCorrectClick} color="default" className="col s12" style={{ color: "#aaa", border: '3px dashed #eee', margin: '1rem 0', padding: '3rem 0' }}>
                                        <i className="large material-icons">done</i>
                                    </Button>
                                </div>
                            </div>
                        }
                        {completed &&
                            <div> done!
                                {/* <div style={{ margin: '1rem', minWidth: 275 }}>
                                    <Button onClick={this.onCardAddClick} color="default" className="col s12" style={{ color: "#aaa", border: '3px dashed #eee', margin: '1rem 0', padding: '3rem 0' }}>
                                        <i className="material-icons">add</i>
                                    </Button>
                                </div>
                                <DeleteDeckButton handleDeckDelete={this.handleDeckDelete} />
                                <div className="fixed-action-btn center-align" id="saveFAB">
                                    <a className="btn-floating btn-large blue z-depth-3" onClick={this.onSaveClick}>
                                        <i className="large material-icons">save</i>
                                    </a>
                                </div> */}
                            </div>
                        }
                    </div>
                }
            </div >
        );
    }
}

StudyViewer.propTypes = {
    auth: PropTypes.object.isRequired,
    selectedDeck: PropTypes.object.isRequired,
    getDeckById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    selectedDeck: state.selectedDeck
});

export default connect(
    mapStateToProps,
    { getDeckById }
)(withRouter(StudyViewer));