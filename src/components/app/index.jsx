import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { getCurrentUserFromCookies } from '../../api';
import MainContent from '../main-content';
import Sidebar from '../sidebar';

import './style.css';

class App extends React.Component {
  componentWillMount() {
    getCurrentUserFromCookies();
  }

  render() {
    const { ready } = this.props;
    return (
      <div className="app">
        <Sidebar />
        {ready ? (
          <BrowserRouter>
            <MainContent />
          </BrowserRouter>
        ) : null}
      </div>
    );
  }
}

export default connect(({ ready }) => ({ ready }))(App);
