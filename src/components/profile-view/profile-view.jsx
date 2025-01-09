import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import FavoriteMovies from './favorite-movies';  // Assuming default export
import ProfileUpdate from './profile-update';  // Importing as default since exported as default
import UserInfo from './user-info';            // Assuming default export
import { deleteUser } from '../../services/apiService';

export const ProfileView = ({ user, token, favoriteMovies, toggleFavorite, onLoggedOut }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account?')) return;
    setIsDeleting(true);
    try {
      await deleteUser(user.Username, token);
      alert('Account deleted successfully!');
      onLoggedOut();
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('An error occurred: ' + error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Container className="profile-view mt-4">
      <Row>
        <Col md={6} className="mb-4">
          <Card className="user-info-card">
            <Card.Header className="text-center">Account Information</Card.Header>
            <Card.Body>
              <UserInfo name={user.Username} email={user.Email} />
              <p><strong>Birthday:</strong> {user.Birthday ? new Date(user.Birthday).toLocaleDateString() : 'N/A'}</p>
              <ProfileUpdate user={user} token={token} updatedUser={() => { /* handle user updates */ }} />
            </Card.Body>
          </Card>
          <Button variant="danger" className="mt-3 w-100" onClick={handleDeleteAccount} disabled={isDeleting}>
            {isDeleting ? <Spinner animation="border" size="sm" /> : 'Delete Account'}
          </Button>
        </Col>
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
  onLoggedOut: PropTypes.func.isRequired,
  favoriteMovies: PropTypes.array.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};
