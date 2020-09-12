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
            // LogoutButton = (
            //     <button
            //         style={{
            //             width: "100px",
            //             borderRadius: "3px",
            //             letterSpacing: "1.5px",
            //             margin: "1rem 1rem 0 0"
            //         }}
            //         onClick={this.onLogoutClick}
            //         className="btn waves-effect right waves-light hoverable red accent-4 sidenav-close">
            //         Logout
            //     </button>
            // );
        }
        return (
            <div>
                <div className="navbar-fixed">
                    <nav>
                        {/* <nav className="z-depth-0"> */}
                        <div className="nav-wrapper white">
                            <Link to="/" style={{ fontFamily: "monospace" }} className="col s5 brand-logo center black-text">
                                <i className="material-icons" style={{ color: "black" }}>whatshot</i> flashy
                        </Link>
                            {/* {LogoutButton} */}
                            {auth.isAuthenticated &&
                                <div>
                                    <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons md-36" style={{ color: "black" }}>menu</i></a>
                                    <ul className="right hide-on-med-and-down">
                                        <li><a href="#" className="black-text">Decks</a></li>
                                        <li><a href="#" className="black-text">Explore</a></li>
                                        <li><a href="#" className="black-text">Account</a></li>
                                        <li><a href="#" className="black-text" onClick={this.onLogoutClick}>Logout</a></li>
                                    </ul>
                                </div>
                            }
                        </div>
                    </nav>
                </div>
                <div>
                    {auth.isAuthenticated &&
                        <ul id="slide-out" className="sidenav" >
                            {/* <li><b className="flow-text right" style={{display: "block"}}>{auth.user.username}</b></li> */}
                            <li style={{ paddingLeft: "1rem" }}>
                                <h4>
                                    <span class="material-icons md-36 vertical-align-middle red-text text-darken-4">account_circle</span>
                                    <b style={{ padding: "0 0 1rem 1rem" }} className="vertical-align-middle padding-bottom-3 red-text text-darken-4">{auth.user.username}</b>
                                </h4>
                            </li>
                            <li><a href="#" className="flow-text">Decks</a></li>
                            <li><a href="#">Explore</a></li>
                            <li><a href="#">Account</a></li>
                            <li><a href="#" className="sidenav-close" onClick={this.onLogoutClick}>Logout</a></li>
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