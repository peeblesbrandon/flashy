import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { logoutUser } from '../../actions/authActions';
import './Navbar.css';
import M from 'materialize-css/dist/js/materialize.min.js';

class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let sidenav = document.querySelector('#slide-out');
        M.Sidenav.init(sidenav, {});
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
        this.props.history.push('/login');
    };

    render() {
        const { auth } = this.props;
        let LogoutButton;
        if (auth.isAuthenticated) {
            LogoutButton = (
                <button
                    style={{
                        width: "100px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        margin: "1rem 1rem 0 0"
                    }}
                    onClick={this.onLogoutClick}
                    className="btn waves-effect right waves-light hoverable red accent-4 sidenav-close">
                    Logout
                </button>
            );
        }
        return (
            <div>
                <nav className="navbar-fixed">
                {/* <nav className="z-depth-0"> */}
                    <div className="nav-wrapper white">
                        <Link to="/" style={{ fontFamily: "monospace" }} className="col s5 brand-logo center black-text">
                            <i className="material-icons">whatshot</i> flashy
                        </Link>
                        {/* {LogoutButton} */}
                        <a href="#" data-target="slide-out" className="sidenav-trigger sidenav-open"><i className="material-icons sidenav-open" style={{ color: "black" }}>menu</i></a>
                        <ul className="right hide-on-med-and-down">
                            <li>{LogoutButton}</li>
                        </ul>
                    </div>
                </nav>
                <ul id="slide-out" className="sidenav">
                    <li>{LogoutButton}</li>
                </ul>
            </div>
        );
    }
}

const addMenuListener = () => {
    const M = window.M;
    document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems, {});
    });
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(withRouter(Navbar));