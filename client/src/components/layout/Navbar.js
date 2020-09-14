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

    onDecksClick = e => {
        e.preventDefault();
        this.props.history.push('/dashboard');
    };

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
        this.props.history.push('/login');
    };

    render() {
        const { auth } = this.props;
        return (
            <div>
                <div className="navbar-fixed">
                    <nav>
                        {/* <nav className="z-depth-0"> */}
                        <div className="nav-wrapper white">
                            <Link to="/" style={{ fontFamily: "monospace" }} className="col s5 brand-logo center-align black-text">
                                <i className="material-icons md-36" style={{ color: "black", marginLeft: "1rem" }}>whatshot</i>
                            </Link>
                            {/* {LogoutButton} */}
                            {auth.isAuthenticated &&
                                <div>
                                    <a href="#/" data-target="slide-out" className="sidenav-trigger"><i className="material-icons md-36" style={{ color: "black" }}>menu</i></a>
                                    <ul className="right hide-on-med-and-down">
                                        <li><a href="#/" className="black-text">Decks</a></li>
                                        <li><a href="#/" className="black-text"><span className="new badge red" data-badge-caption="coming soon" style={{ marginRight: "1rem" }} />Explore</a></li>
                                        <li><a href="#/" className="black-text"><span className="new badge red" data-badge-caption="coming soon" style={{ marginRight: "1rem" }} />Settings</a></li>
                                        <li><a href="#/" className="black-text" onClick={this.onLogoutClick}>Logout</a></li>
                                    </ul>
                                </div>
                            }
                        </div>
                    </nav>
                </div>
                <div>
                    {auth.isAuthenticated &&
                        <ul id="slide-out" className="sidenav collection with-header" style={{ border: "0pc" }} >
                            {/* <li><b className="flow-text right" style={{display: "block"}}>{auth.user.username}</b></li> */}
                            <li className="collection-header red darken-4" style={{ paddingLeft: "1rem", paddingBottom: "1rem" }}>
                                <h4>
                                    <span className="material-icons md-36 vertical-align-middle white-text">account_circle</span>
                                    <b style={{ padding: "0 0 1rem 1rem" }} className="vertical-align-middle padding-bottom-3 white-text">{auth.user.username}</b>
                                </h4>
                            </li>
                            <li className="no-padding-override"><a href="#/" className="sidenav-close" style={{}} onClick={this.onDecksClick}>Decks</a></li>
                            <li className="no-padding-override"><a href="#/" className="sidenav-close"><span className="new badge red" data-badge-caption="coming soon" />Explore</a></li>
                            <li className="no-padding-override"><a href="#/" className="sidenav-close"><span className="new badge red" data-badge-caption="coming soon" />Settings</a></li>
                            <li className="no-padding-override"><a href="#/" className="sidenav-close" onClick={this.onLogoutClick}>Logout</a></li>
                            {/* <li>{LogoutButton}</li> */}
                        </ul>
                    }
                </div>
            </div>
        );
    }
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