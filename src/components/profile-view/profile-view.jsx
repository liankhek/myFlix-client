import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FavoriteMovies } from './favorite-movies';
import { ProfileUpdate } from './profile-update';
import { UserInfo } from './user-info';
import { DeleteAccountButton } from './deleteAccount-button'; // Import DeleteAccountButton

export const ProfileView = ({ user, token, favoriteMovies, toggleFavorite, onLoggedOut }) => {
  const [currentUser, setCurrentUser] = useState(user);

  const handleUpdateUser = (updatedUser) => {
    setCurrentUser(updatedUser);
  };

  const handleAccountDeleted = () => {
    onLoggedOut();
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
                <strong>Birthday:</strong>{' '}
                {currentUser.Birthday ? new Date(currentUser.Birthday).toLocaleDateString() : 'N/A'}
              </p>
            </Card.Body>
          </Card>

          {/* Update Profile Section */}
          <Card className="mt-4">
            <Card.Body>
              <ProfileUpdate user={currentUser} token={token} updatedUser={handleUpdateUser} />
            </Card.Body>
          </Card>

          <DeleteAccountButton
            user={currentUser}
            token={token}
            onAccountDeleted={handleAccountDeleted} // Pass the function to handle account deletion
          />
        </Col>

        {/* Favorite Movies Section */}
        <Col md={6}>
          <Card className="favorite-movies-card">
            <Card.Header className="text-center">Favorite Movies</Card.Header>
            <Card.Body>
              <FavoriteMovies favMovies={favoriteMovies} toggleFavorite={toggleFavorite} />
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
  }).isRequired,
  token: PropTypes.string.isRequired,
  favoriteMovies: PropTypes.array.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  onLoggedOut: PropTypes.func.isRequired,
};
