import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

// redux
import { Provider } from 'react-redux';
import store from './store';

// components
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Deck from './components/Deck.js';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            {/* <Navbar />    <---- commented out so we can exclude navbar from landing page*/}
            <Route exact path="/" component={Landing} />
            <Route exact path="/register">
              <Navbar />
              <Register />
            </Route>
            <Route exact path="/login">
              <Navbar />
              <Login />
            </Route>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
