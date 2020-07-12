import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import jwt_decode from 'jwt-decode';

import './App.css';

import PrivateRoute from './components/common/PrivateRoute';
import PublicRoute from './components/common/PublicRoute';

import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import TransactionsDashboard from './components/transactions/TransactionsDashboard';
import AddTransaction from './components/transactions/AddTransaction';
import EditTransaction from './components/transactions/EditTransaction';
import NotFound from './components/not-found/NotFound';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header
  setAuthToken(localStorage.jwtToken);
  // Decode token to get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated state
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Token expired - logout and redirect
    store.dispatch(logoutUser());
    window.location.href = '/';
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="App">
          <Switch>
            <PublicRoute exact path="/" component={Landing} />
            <PublicRoute path="/login" component={Login} />
            <PublicRoute path="/register" component={Register} />
            <PrivateRoute path="/dashboard" component={TransactionsDashboard} />
            <PrivateRoute path="/create" component={AddTransaction} />
            <PrivateRoute path="/edit/:id" component={EditTransaction} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
