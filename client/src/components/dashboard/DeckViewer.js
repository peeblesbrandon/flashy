import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDeckById, patchDeckById } from '../../actions/selectedDeckActions';
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
import Slide from '@material-ui/core/Slide';
import './DeckViewer.css';

// components
import LoadingSpinFullScreen from '../loader/LoadingSpinFullScreen';
import Navbar from '../layout/Navbar';

class DeckViewer extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            title: this.props.selectedDeck.data.title,
            description: this.props.selectedDeck.data.description,
            private: this.props.selectedDeck.data.private,
            editMode: false
        }
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.togglePrivacy = this.togglePrivacy.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
    }

    componentDidMount() {
        // let fab = document.querySelector("#deckEditFAB");
        // M.FloatingActionButton.init(fab, {});
        this.props.getDeckById(this.props.match.params.id);
        M.AutoInit();
    };

    componentDidUpdate() {
        // this.props.getDeckById(this.props.match.params.id);
        M.AutoInit();
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            title: nextProps.selectedDeck.data.title,
            description: nextProps.selectedDeck.data.description,
            private: nextProps.selectedDeck.data.private
        });
    };

    onSaveClick = e => {
        // add error checking here
        e.preventDefault();
        console.log('saved');
        console.log(this.state);
        const deckPatch = {
            title: this.state.title,
            description: this.state.description,
            private: this.state.private
        };
        this.props.patchDeckById(this.props.selectedDeck.data._id, deckPatch);
        this.toggleEditMode();
    };

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
        if (e.target.id === 'description') {
            // M.textareaAutoResize($('#description'));
        }
    };

    onDeleteClick = () => {

    }

    onDeleteClose = () => {

    }

    toggleEditMode = () => {
        if (this.state.editMode) {
            this.setState({ editMode: false });
        } else {
            this.setState({ editMode: true });
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
        console.log(this.state);
        return (
            <div>
                <Navbar />
                {selectedDeck.loading &&
                    <LoadingSpinFullScreen />
                }
                {!selectedDeck.loading &&
                    <div style={{ height: "100vh" }} className="container">
                        {!this.state.editMode &&
                            <div>
                                <div className="row">
                                    <button onClick={this.props.history.goBack} className="col s12 left left-align btn-flat waves-effect">
                                        <i className="material-icons left left-align">keyboard_backspace</i>Back
                                    </button>
                                    <div>
                                        <h5 className="col s11"><b className="left left-align red-text text-darken-3 truncate">{selectedDeck.data.title}</b></h5>
                                        {selectedDeck.data.private &&
                                            <i className="right-align small material-icons grey-text vertical-align-middle col s1" style={{ padding: "5px" }}>lock</i>
                                        }
                                        {!selectedDeck.data.private &&
                                            <i className="right-align small material-icons grey-text vertical-align-middle col s1" style={{ padding: "5px" }}>lock_open</i>
                                        }
                                    </div>
                                    <p className="col s12 grey-text">{selectedDeck.data.description}</p>
                                    <br />
                                    <em className="col s12">Note: JSON output below is a placeholder</em>
                                    <pre className="col s12 left-align maxLines">{JSON.stringify(selectedDeck.data, undefined, 2)}</pre>
                                </div>
                                <div className="fixed-action-btn" id="deckEditFAB">
                                    <a className="btn-floating btn-large red darken-3 z-depth-3">
                                        <i className="large material-icons">expand_less</i>
                                    </a>
                                    <ul>
                                        <li><a className="btn-floating red lighten-1"><i className="material-icons" onClick={this.toggleEditMode}>mode_edit</i></a></li>
                                        <li><a className="btn-floating yellow darken-3"><i className="material-icons">add</i></a></li>
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
                                        <TextField // materialize css textarea wasnt autoresizing 
                                            id="description"
                                            label="Description"
                                            // placeholder="Placeholder"
                                            value={this.state.description}
                                            className="col s12 left left-align"
                                            style={{ marginBottom: "1rem" }}
                                            multiline
                                            rowsMax={6}
                                            s={12}
                                            onChange={this.onChange}
                                        />
                                        <em className="col s12">Note: JSON output below is a placeholder</em>
                                        <pre className="col s12 left-align maxLines">{JSON.stringify(selectedDeck.data, undefined, 2)}</pre>
                                    </div>
                                    {/* <div>
                                        <a href="#/" class="waves-effect waves-light red btn-large"><i class="material-icons left" onClick={this.onDeleteClick}>delete</i>Delete deck</a>
                                        <Dialog
                                            open={open}
                                            keepMounted
                                            onClose={this.onDeleteClose}
                                            aria-labelledby="alert-dialog-slide-title"
                                            aria-describedby="alert-dialog-slide-description"
                                        >
                                            <DialogTitle id="alert-dialog-slide-title">{"Delete this deck?"}</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-slide-description">
                                                    You are about to delete this deck. This action cannot be undone. Do you still wish to continue?
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={this.onDeleteClose} color="info">
                                                    Cancel
                                                </Button>
                                        <       Button onClick={this.onDeleteClose} color="danger">
                                                    Delete
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </div> */}
                                    <div className="fixed-action-btn" id="saveFAB">
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
    patchDeckById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    selectedDeck: state.selectedDeck
});

export default connect(
    mapStateToProps,
    { getDeckById, patchDeckById }
)(withRouter(DeckViewer));