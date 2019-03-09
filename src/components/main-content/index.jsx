import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';
import { Route } from 'react-router-dom';

import ErrorMessage from '../error-message';
import Ideas from '../ideas';
import SignIn from '../sign-in';
import SignUp from '../sign-up';

import './style.css';

const MainContent = ({ error, ready }) => {
  const routes = [
    <Route path="/signin" key="signin" component={SignIn} />,
    <Route path="/signup" key="signup" component={SignUp} />,
    <Route path="/ideas" key="ideas" component={Ideas} />,
    <Redirect from="/" to="/ideas" key="default" />,
  ];

  return (
    <div className="main-content">
      {error ? (
        <ErrorMessage message={error} />
      ) : null}
      {ready ? (
        <div>
          {routes}
        </div>
      ) : (
        <React.Fragment />
      )}
    </div>
  );
};

export default withRouter(connect(({ ready, globalerror }) => ({ ready, error: globalerror }))(MainContent));
