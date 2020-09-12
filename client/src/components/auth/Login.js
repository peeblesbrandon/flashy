import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import classnames from 'classnames';
import LoadingSpinFullScreen from '../loader/LoadingSpinFullScreen';
import store from '../../store'; // remove later
import { CLEAR_ERRORS } from '../../actions/types'; // remove later and replace with custom dispatch func

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    componentDidMount() {
        // add an action call to clear errors
        // if logged in user tries to navigate to login page, redirect
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        } 
        store.dispatch({ type: CLEAR_ERRORS }) // remove later and replace with custom dispatch func
        
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated ) {
            this.props.history.push('/dashboard'); // redirect user to dash after login
            this.setState({
                errors: {}
            });
        } else if (nextProps.errors) {
            console.log(nextProps);
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData);
    };
    
    render() {
        const { errors } = this.state;
        if (this.props.auth.isAuthenticated && this.props.auth.loading) { // takeover screen with loading icon while logging in
            return (
                <LoadingSpinFullScreen /> 
            );
        } else {
            return (
                <div className="container">
                    <div style={{ marginTop: "4rem" }} className="row">
                        <div className="col s12 m8 offset-m2">
                            <Link to="/" className="btn-flat waves-effect">
                                <i className="material-icons left">keyboard_backspace</i> Back
                        </Link>
                            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                <h4>
                                    <b>Login</b>
                                </h4>
                                <p className="grey-text text-darken-1">
                                    Don't have an account? <Link to="/register">Register</Link>
                                </p>
                            </div>
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="input-field col s12">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.email}
                                        error={errors.email}
                                        id="email"
                                        type="email"
                                        className={classnames('', {
                                            invalid: errors.email || errors.emailnotfound
                                        })}
                                    />
                                    <label htmlFor="email">Email</label>
                                    <span className="red-text">
                                        {errors.email}
                                        {errors.emailnotfound}
                                    </span>
                                </div>
                                <div className="input-field col s12">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.password}
                                        error={errors.password}
                                        id="password"
                                        type="password"
                                        className={classnames('', {
                                            invalid: errors.password || errors.passwordIncorrect
                                        })}
                                    />
                                    <label htmlFor="password">Password</label>
                                    <span className="red-text">
                                        {errors.password}
                                        {errors.passwordIncorrect}
                                    </span>
                                </div>
                                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                    <button
                                        style={{
                                            width: "150px",
                                            borderRadius: "3px",
                                            letterSpacing: "1.5px",
                                            marginTop: "1rem"
                                        }}
                                        type="submit"
                                        className="btn btn-large waves-effect waves-light hoverable red accent-4">
                                        Login
                                </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors 
});

export default connect(
    mapStateToProps,
    { loginUser, clearErrors } 
)(withRouter(Login));