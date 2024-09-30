import React from 'react';
import PropTypes from 'prop-types';

export const UserInfo = ({ name, email }) => {
  return (
    <div>
      <h2>Account Information</h2>
      <p>Username: {name}</p>
      <p>Email: {email}</p>
    </div>
  );
};

UserInfo.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
};
