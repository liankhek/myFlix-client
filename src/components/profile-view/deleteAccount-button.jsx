import React, { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { deleteUser } from '../../services/apiService';

export const DeleteAccountButton = ({ user, token, onAccountDeleted }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account?')) return;
    setIsDeleting(true);
    try {
      await deleteUser(user.Username, token);
      alert('Account deleted successfully!');
      onAccountDeleted();
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button
      variant="danger"
      onClick={handleDeleteAccount}
      disabled={isDeleting}
      className="mt-3 w-100"
    >
      {isDeleting ? <Spinner animation="border" size="sm" /> : 'Delete Account'}
    </Button>
  );
};

DeleteAccountButton.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
  }).isRequired,
  token: PropTypes.string.isRequired,
  onAccountDeleted: PropTypes.func.isRequired,
};
