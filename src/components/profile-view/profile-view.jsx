import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { ProfileUpdate } from './profile-update';
import { FavoriteMovies } from './favorite-movies';

export const ProfileView = ({ user, token, updatedUser, onLoggedOut }) => {
  const handleDeleteAccount = () => {
    fetch(`https://moviesdb-6abb3284c2fb.herokuapp.com/users/${user.Username}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response.ok) {
          onLoggedOut();
        } else {
          alert('Account deletion failed.');
        }
      });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Card>
            <Card.Body>
              <h2>Your Info</h2>
              <p>Name: {user.Username}</p>
              <p>Email: {user.Email}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card>
            <Card.Body>
              <ProfileUpdate user={user} updatedUser={updatedUser} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col xs={12} md={6}>
          <Button variant="danger" onClick={handleDeleteAccount}>
            Delete Account
          </Button>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col xs={12}>
          <h3>Favorite Movies</h3>
          <FavoriteMovies favMovies={user.FavoriteMovies || []} />
        </Col>
      </Row>
    </Container>
  );
};

ProfileView.propTypes = {
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  updatedUser: PropTypes.func.isRequired,
  onLoggedOut: PropTypes.func.isRequired
};
