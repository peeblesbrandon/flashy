import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

// components
import Deck from '../deck/Deck';

class Dashboard extends Component {
    
    
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;
        // const decksData = [{ id: 0, title: 'Spanish vocab' }, { id: 1, title: 'Data structures 101' }, { id: 2, title: 'Greek mythology' }];
        return (
            <div style={{ height: "100vh" }} className="container valign-wrapper">
                <div className="row">
                    <div className="col s12 center-align">
                        <h4>
                            <b>Hey there,</b> {user.username}
                            <p className="flow-text grey-text text-darken-1">
                                You are logged into <span style={{ fontFamily: "monospace" }}>flashy</span> 👏
                        </p>
                        </h4>
                        <button
                            style={{
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}
                            onClick={this.onLogoutClick}
                            className="btn btn-large waves-effect waves-light hoverable red accent-4">
                            Logout
                        </button>
                    </div>
                    <div className="col s12 center-align">
                        {/* {decksData.map((deck) =>
                            <Deck key={deck.id.toString()} title={deck.title} />
                        )} */}
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);