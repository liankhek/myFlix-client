import React from 'react';
import PropTypes from 'prop-types';

export const UserInfo = ({ name, email }) => {
  return (
    <div className="user-info">
      <h3>Username: {name}</h3>
      <p>Email: {email}</p>
    </div>
  );
};

UserInfo.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};
