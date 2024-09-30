
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FavoriteMovies } from './favorite-movies';
import { ProfileUpdate } from './profile-update';

export const ProfileView = ({ user, token, onLoggedOut }) => {
  const [currentUser, setCurrentUser] = useState(user);

  const handleDeleteAccount = () => {
    fetch(`https://da-flix-1a4fa4a29dcc.herokuapp.com/users/${user.Username}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response.ok) {
          alert('Account deleted successfully!');
          onLoggedOut();
        } else {
          alert('Account deletion failed.');
        }
      })
      .catch((error) => {
        console.error('Error deleting account:', error);
        alert('An error occurred. Please try again.');
      });
  };

  const handleUpdateUser = (updatedUser) => {
    setCurrentUser(updatedUser);
  };

  return (
    <Container className="profile-view">
      <Row>
        {/* User Info */}
        <Col md={6}>
          <Card>
            <Card.Header>Your Info</Card.Header>
            <Card.Body>
              <p><strong>Username:</strong> {currentUser.Username}</p>
              <p><strong>Email:</strong> {currentUser.Email}</p>
              <p><strong>Birthday:</strong> {currentUser.Birthday ? new Date(currentUser.Birthday).toLocaleDateString() : 'N/A'}</p>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <ProfileUpdate user={currentUser} token={token} updatedUser={handleUpdateUser} />
            </Card.Body>
          </Card>
          <Button variant="danger" onClick={handleDeleteAccount}>
            Delete Account
          </Button>
        </Col>

        {/* Favorite Movies */}
        <Col md={6}>
          <Card>
            <Card.Header>Favorite Movies</Card.Header>
            <Card.Body>
              <FavoriteMovies favMovies={currentUser.FavoriteMovies || []} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

ProfileView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
    FavoriteMovies: PropTypes.array,
  }).isRequired,
  token: PropTypes.string.isRequired,
  onLoggedOut: PropTypes.func.isRequired,
};
