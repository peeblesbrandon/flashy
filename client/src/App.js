import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import './App.css';

// redux
import { Provider } from 'react-redux';
import store from './store';

// components
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from './components/private-route/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';

// check for token to keep user logged in
if (localStorage.jwtToken) {
  // set auth token header
  const token = JSON.parse(localStorage.jwtToken);
  // const token = localStorage.jwtToken;
  setAuthToken(token);
  // decode token to get user info and expiry
  const decoded = jwt_decode(token);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // log user out
    store.dispatch(logoutUser());
    // redirect to login page
    window.location.href = './login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            {/* public routes  */}
            <Route exact path="/" component={Landing} />
            <Route exact path="/register">
              <Navbar />
              <Register />
            </Route>
            <Route exact path="/login">
              <Navbar />
              <Login />
            </Route>

            {/* private routes */}
            <Switch>
              <PrivateRoute exact path='/dashboard' component={ Dashboard } />
                {/* <Navbar />
                <Dashboard />
              </PrivateRoute> */}
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
