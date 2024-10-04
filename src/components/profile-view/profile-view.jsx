import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FavoriteMovies } from './favorite-movies';
import { ProfileUpdate } from './profile-update';
import { UserInfo } from './user-info'; // Reuse the UserInfo component

export const ProfileView = ({ user, token, favoriteMovies, toggleFavorite }) => {
  const [currentUser, setCurrentUser] = useState(user);
  const [isDeleting, setIsDeleting] = useState(false); 

  const handleDeleteAccount = () => {
    if (!window.confirm('Are you sure you want to delete your account?')) return;

    setIsDeleting(true); 
    fetch(`https://da-flix-1a4fa4a29dcc.herokuapp.com/users/${user.Username}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
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
    })
    .finally(() => {
      setIsDeleting(false); 
    });
  };

  const handleUpdateUser = (updatedUser) => {
    setCurrentUser(updatedUser);
  };

const handleRemoveFavorite = (movieId) => {
  alert('Feature not implemented yet.');
};

return (
  <Container className="profile-view mt-4">
    <Row>
      {/* User Info Section */}
      <Col md={6} className="mb-4">
        <Card className="user-info-card">
          <Card.Header className="text-center">Account Information</Card.Header>
          <Card.Body>
            <UserInfo name={currentUser.Username} email={currentUser.Email} />
            <p>
              <strong>Birthday:</strong> {currentUser.Birthday ? new Date(currentUser.Birthday).toLocaleDateString() : 'N/A'}
            </p>
          </Card.Body>
        </Card>

        {/* Update Profile Section */}
        <Card className="mt-4">
          <Card.Body>
            <ProfileUpdate user={currentUser} token={token} updatedUser={handleUpdateUser} />
          </Card.Body>
        </Card>

        <Button
          variant="danger"
          className="mt-3 w-100"
          onClick={handleDeleteAccount}
          disabled={isDeleting}
        >
          {isDeleting ? <Spinner animation="border" size="sm" /> : 'Delete Account'}
        </Button>
      </Col>

      {/* Favorite Movies Section */}
      <Col md={6}>
          <Card className="favorite-movies-card">
            <Card.Header className="text-center">Favorite Movies</Card.Header>
            <Card.Body>
              {favoriteMovies.length ? (
                <FavoriteMovies favMovies={favoriteMovies} toggleFavorite={toggleFavorite} />
              ) : (
                <p>No favorite movies yet</p>
              )}
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
  favoriteMovies: PropTypes.array.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};

