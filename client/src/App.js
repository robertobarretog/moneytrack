import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import jwt_decode from 'jwt-decode';

import './App.css';

import PrivateRoute from './components/common/PrivateRoute';
import PublicRoute from './components/common/PublicRoute';

import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import Layout from './components/layout/Layout';
import Landing from './components/layout/Landing';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import NotFound from './components/not-found/NotFound';

// Lazy-loaded components
const ForgotPassword = lazy(() => import('./components/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./components/auth/ResetPassword'));
const TransactionsDashboard = lazy(() =>
  import('./components/transactions/TransactionsDashboard')
);
const AddTransaction = lazy(() =>
  import('./components/transactions/AddTransaction')
);
const EditTransaction = lazy(() =>
  import('./components/transactions/EditTransaction')
);

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
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <PublicRoute path="/login" component={Login} />
              <PublicRoute path="/register" component={Register} />
              <PublicRoute path="/forgot-password" component={ForgotPassword} />
              <PublicRoute
                path="/reset-password/:resettoken"
                component={ResetPassword}
              />
              <PrivateRoute
                path="/dashboard"
                component={TransactionsDashboard}
              />
              <PrivateRoute path="/create" component={AddTransaction} />
              <PrivateRoute path="/edit/:id" component={EditTransaction} />
              <PublicRoute exact path="/" component={Landing} />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
