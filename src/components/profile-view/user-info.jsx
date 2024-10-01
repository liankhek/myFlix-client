import React from 'react';
import PropTypes from 'prop-types';

export const UserInfo = ({ name, email }) => {
  return (
    <div className="user-info">
      <h3 className="user-info-name">Username: {name}</h3>
      <p className="user-info-email">Email: {email}</p>
    </div>
  );
};

UserInfo.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

