import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Switch, withRouter } from 'react-router';
import { Route } from 'react-router-dom';

import ErrorMessage from '../error-message';
import Ideas from '../ideas';
import SignIn from '../sign-in';
import SignUp from '../sign-up';

import './style.css';

const MainContent = ({ error }) => (
  <div className="main-content">
    {error ? (
      <ErrorMessage message={error} />
    ) : null}
    <Switch>
      <Route path="/signin" key="signin" component={SignIn} />
      <Route path="/signup" key="signup" component={SignUp} />
      <Route path="/ideas" key="ideas" component={Ideas} />
      <Redirect from="/" to="/ideas" key="default" exact />
    </Switch>
  </div>
);

export default withRouter(connect(({ globalerror }) => ({ error: globalerror }))(MainContent));
