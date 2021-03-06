import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Layout from '../layout/Layout';
import Landing from '../layout/Landing';
import Login from '../auth/Login';
import Register from '../auth/Register';
import NotFound from '../not-found/NotFound';
import Spinner from '../common/Spinner/Spinner';
// Lazy-loaded components
const ForgotPassword = lazy(() => import('../auth/ForgotPassword'));
const ResetPassword = lazy(() => import('../auth/ResetPassword'));
const TransactionsDashboard = lazy(() =>
  import('../transactions/TransactionsDashboard')
);
const AddTransaction = lazy(() => import('../transactions/AddTransaction'));
const EditTransaction = lazy(() => import('../transactions/EditTransaction'));
const ViewTransaction = lazy(() => import('../transactions/ViewTransaction'));

const Routes = () => (
  <Layout>
    <Suspense fallback={<Spinner />}>
      <Switch>
        <PublicRoute path="/login" component={Login} />
        <PublicRoute path="/register" component={Register} />
        <PublicRoute path="/forgot-password" component={ForgotPassword} />
        <PublicRoute
          path="/reset-password/:resettoken"
          component={ResetPassword}
        />
        <PrivateRoute path="/dashboard" component={TransactionsDashboard} />
        <PrivateRoute path="/create" component={AddTransaction} />
        <PrivateRoute path="/edit/:id" component={EditTransaction} />
        <PrivateRoute path="/transaction/:id" component={ViewTransaction} />
        <PublicRoute exact path="/" component={Landing} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  </Layout>
);

export default Routes;
