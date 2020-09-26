import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { loginUser } from '../../actions/authActions';
import { connect } from "react-redux";

class Landing extends Component {
    componentDidMount() {
        // if logged in user tries to navigate to landing page, redirect
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard'); // redirect user to dash after login
            this.setState({
                errors: {}
            });
        }
    }

    onSubmit = e => {
        e.preventDefault();
        // login for demo account
        const userData = {
            email: "demouser@gmail.com",
            password: "LAQ@zqUDnq8mmt4"
        };
        this.props.loginUser(userData);
    };

    render() {
        return (
            <div style={{ height: "75vh" }} className="cotnainer valign-wrapper">
                <div className="row">
                    <div className="col s12 center-align">
                        <h4 style={{ fontFamily: "monospace" }} className="brand-logo center black-text">
                            <i className="material-icons">whatshot</i> flashy
                        </h4>
                        <p>
                            Create, study, and share your flashcards
                        </p>
                        <br />
                        <div className="col s6">
                            <Link to="/register" style={{
                                width: "140px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px"
                            }} className="btn btn-large waves-effect waves-light hoverable red accent-4">
                                Register
                            </Link>
                        </div>
                        <div className="col s6">
                            <Link to="/login" style={{
                                width: "140px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px"
                            }} className="btn btn-large waves-effect white black-text">
                                Login
                            </Link>
                        </div>
                        <br />
                        <form noValidate onSubmit={this.onSubmit}>
                            <button
                                style={{
                                    width: "300px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }}
                                type="submit"
                                className="btn btn-large btn-flat waves-effect waves-light white grey-text">
                                Demo login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

Landing.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginUser }
)(withRouter(Landing));

// export default Landing;