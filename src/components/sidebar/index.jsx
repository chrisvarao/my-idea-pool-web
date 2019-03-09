import React from 'react';
import { connect } from 'react-redux';

import icon from '../../../assets/IdeaPool_icon.png';
import { signout } from '../../api';
import './style.css';

const Sidebar = ({ name, avatarUrl }) => (
  <div className="sidebar">
    <div className="sidebar__icon-container">
      <img className="sidebar__icon" src={icon} alt="The Idea Pool" />
      <span className="sidebar__icon-text">
        The Idea Pool
      </span>
    </div>
    {
      name ? (
        <div>
          <hr className="sidebar__separator" />
          <div className="sidebar__icon-container">
            <img className="sidebar__icon" src={avatarUrl} alt={name} />
            <span className="sidebar__icon-text">
              {name}
            </span>
            <span className="sidebar__icon-text sidebar__user-name">
              <button className="sidebar__logout-button" type="button" onClick={signout}>Log out</button>
            </span>
          </div>
        </div>
      ) : null
    }
  </div>
);

export default connect(({ user }) => {
  user = user || {};
  return {
    name: user.name, avatarUrl: user.avatarUrl,
  };
})(Sidebar);
