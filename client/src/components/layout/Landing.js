import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
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
                            }} className="btn btn-large btn-flat waves-effect white black-text">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;