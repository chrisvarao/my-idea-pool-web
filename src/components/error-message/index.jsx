import React from 'react';

import './style.css';

const ErrorMessage = ({ message }) => (
  <div className="error-message">
    {message}
  </div>
);

export default ErrorMessage;
