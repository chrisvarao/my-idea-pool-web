import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { getIdeaPage } from '../../api';
import MainContent from '../main-content';
import Sidebar from '../sidebar';

import './style.css';

class App extends React.Component {
  componentWillMount() {
    const { history } = this.props;
    this.unlisten = history.listen((location) => {
      const { user } = this.props;
      if (location.pathname === '/ideas' && user) {
        getIdeaPage(1);
      }
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    return (
      <div className="app">
        <Sidebar />
        <MainContent />
      </div>
    );
  }
}

export default withRouter(connect(({ user }) => ({ user }))(App));
