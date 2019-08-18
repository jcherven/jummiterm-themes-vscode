/*******************************************************
 * /client/src/App.js
 *******************************************************/

import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import CreateCronExp from './components/cronexp/CreateCronExp';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';

// Check for client's valid auth token (login) at load
if (localStorage.jwt) {
  setAuthToken(localStorage.jwt);
  const decodedJwt = jwt_decode(localStorage.jwt);
  store.dispatch(setCurrentUser(decodedJwt));
  // Check for token expiration during user's session
  const currentTime = Date.now() / 1000;
  if (decodedJwt.exp < currentTime) {
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());
    window.location.href = '/';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={CreateCronExp} />
            <div className="container">
              <Route exact path="/reg" component={Reg} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:vanityUrl" component={Profile} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/cronexp" component={CreateCronExp} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
