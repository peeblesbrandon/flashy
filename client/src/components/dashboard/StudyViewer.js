import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestAllCards, setIncorrectCards } from '../../actions/sessionActions';
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
import ReactMarkdown from "react-markdown";
import './StudyViewer.css';
import 'react-circular-progressbar/dist/styles.css';

// components
import LoadingSpinFullScreen from '../loader/LoadingSpinFullScreen';
import Navbar from '../layout/Navbar';
import selectedDeckReducer from '../../reducers/selectedDeckReducer';
import { session } from 'passport';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

class StudyViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            incorrectCards: [],
            currIndex: 0, // index of current card
            flipped: false,
            completed: false
        }
        this.handleFlipClick = this.handleFlipClick.bind(this);
        this.handleCorrectClick = this.handleCorrectClick.bind(this);
        this.handleWrongClick = this.handleWrongClick.bind(this);
        this.handleRestartAll = this.handleRestartAll.bind(this);
        this.handleRestartIncorrect = this.handleRestartIncorrect.bind(this);
        this.getPercentCorrect = this.getPercentCorrect.bind(this);
    }

    componentDidMount() {
        // this.props.getDeckById(this.props.match.params.id);
        this.props.requestAllCards(this.props.match.params.id);
    };

    shouldComponentUpdate(nextProps) {
        return true;
        // return (JSON.stringify(nextProps.studySession) !== JSON.stringify(this.props.studySession))
    };

    handleFlipClick = () => {
        this.setState({ flipped: !this.state.flipped })
    };

    handleCorrectClick = () => {
        this.setState({
            flipped: false
        });
        setTimeout(() => {
            if (this.state.currIndex === this.props.studySession.cards.length - 1) {
                this.setState({
                    completed: true
                });
            } else {
                this.setState({
                    currIndex: this.state.currIndex + 1
                });
            }
        }, this.state.flipped ? 150 : 0);
    };

    handleWrongClick = () => {
        const newArray = JSON.parse(JSON.stringify(this.state.incorrectCards));
        newArray.push(this.props.studySession.cards[this.state.currIndex]);
        this.setState({
            flipped: false
        });
        setTimeout(() => {
            if (this.state.currIndex === this.props.studySession.cards.length - 1) {
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
        }, this.state.flipped ? 150 : 0);
    };

    handleRestartAll = () => {
        this.props.requestAllCards(this.props.match.params.id);
        this.setState({
            incorrectCards: [],
            currIndex: 0,
            flipped: false,
            completed: false
        });
    };

    handleRestartIncorrect = () => {
        this.props.setIncorrectCards(this.state.incorrectCards);
        this.setState({
            incorrectCards: [],
            currIndex: 0,
            flipped: false,
            completed: false
        });
    }

    getPercentCorrect = () => {
        let correct = this.props.studySession.cards.length - this.state.incorrectCards.length;
        return Math.round(correct / this.props.studySession.cards.length * 100);
    }

    render() {
        const { incorrectCards, currIndex, studyIncorrect, flipped, completed } = this.state;
        const { auth, studySession } = this.props;
        // console.log(this.state);
        return (
            <div style={{ width: "100vw", height: "100vh" }} className="grey darken-2" a>
                <Navbar />
                {(studySession.loading === undefined || studySession.loading === true) &&
                    <LoadingSpinFullScreen />
                }
                {studySession.loading === false &&
                    <div>
                        <div className="row valign-wrapper">
                            <button onClick={this.props.history.goBack} className="col s6 left left-align btn-flat waves-effect white-text" style={{ padding: '0 1rem' }}>
                                <i className="material-icons left left-align">keyboard_backspace</i>Back
                            </button>
                            <div className="col s6 right right-align white-text" style={{ padding: '0 2rem' }}>
                                {!completed && studySession.cards &&
                                    <em>{this.state.currIndex + 1} / {studySession.cards.length}</em>
                                }
                            </div>
                        </div>
                        {!completed && studySession.cards.length > 0 &&
                            <div>
                                <div className="row">
                                    <div className="col s10 center push-s1">
                                        <div className="flip-card" onClick={this.handleFlipClick} style={{ margin: '3rem 1rem' }}>
                                            <div className={`flip-card-inner flow-text ${this.state.flipped ? 'is-flipped' : ''}`}>
                                                <div className="flip-card-front rounded z-depth-5" style={{ padding: "1 rem" }}>
                                                    <ReactMarkdown className="markdown responsive-img left-align" source={`${studySession.cards[currIndex].prompt}`} />
                                                </div>
                                                <div className="flip-card-back rounded z-depth-5" >
                                                    <ReactMarkdown className="markdown responsive-img left-align" source={`${studySession.cards[currIndex].answer}`} style={{ marginLeft: "1 rem" }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s12 center">
                                        <Button onClick={this.handleWrongClick} color="default" className="red white-text z-depth-5" style={{ borderRadius: "100%", margin: "1rem", padding: '1rem' }}>
                                            <i className="large material-icons">not_interested</i>
                                        </Button>
                                        <Button onClick={this.handleCorrectClick} color="default" className="green white-text z-depth-5" style={{ borderRadius: "100%", margin: "1rem", padding: '1rem' }}>
                                            <i className="large material-icons">done</i>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        }
                        {completed &&
                            <div className="row">
                                <h3 className="white-text center-align col s12" style={{ margin: '1rem 0 2rem 0' }}>Nice work!</h3>
                                <div className="row">
                                    <CircularProgressbar
                                        className="center col s6 push-s3 l2 push-l5"
                                        value={this.getPercentCorrect()}
                                        text={`${this.getPercentCorrect()}%`}
                                        styles={buildStyles({
                                            strokeLinecap: 'butt',
                                            pathColor: '#00FF7F',
                                            textColor: '#ffffff',
                                            trailColor: '#ffffff'
                                        })}
                                    />
                                </div>
                                <div className="row">
                                        <div className="btn grey lighten-4 black-text waves-effect flow-text col s10 push-s1 m8 push-m2 l2 push-l5" style={{ margin: '2rem 0 1rem 0' }} onClick={this.handleRestartAll}>
                                            <strong>Study all cards</strong>
                                        </div>
                                </div>
                                <div className="row">
                                    {incorrectCards.length > 0 &&
                                        <div className="btn waves-effect black-text flow-text col s10 push-s1 m8 push-m2 l2 push-l5" style={{ margin: '1rem 0', backgroundColor: '#00FF7F' }} onClick={this.handleRestartIncorrect}>
                                            <strong>Study incorrect cards</strong>
                                        </div>
                                    }
                                </div>
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
    studySession: PropTypes.object.isRequired,
    requestAllCards: PropTypes.func.isRequired,
    setIncorrectCards: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    studySession: state.studySession
});

export default connect(
    mapStateToProps,
    { requestAllCards, setIncorrectCards }
)(withRouter(StudyViewer));