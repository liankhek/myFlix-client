import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const FavoriteMovies = ({ favMovies, toggleFavorite }) => {
  if (favMovies.length === 0) {
    return <p className="text-center">You have no favorite movies.</p>;
  }

  return (
    <Row className="favorite-movies-container">
      {favMovies.map((movie) => (
        <Col md={6} key={movie._id} className="mb-3">
          <Card className="favorite-movie-card h-100">
            {movie.ImagePath ? (
              <Card.Img variant="top" src={movie.ImagePath} alt={movie.Title} />
            ) : (
              <Card.Img variant="top" src="/path/to/default-image.jpg" alt="No Image" />
            )}
            <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>
              <Link to={`/movies/${movie._id}`}>
                <Button variant="primary" className="me-2">Movie Info</Button>
              </Link>
              <Button variant="danger" onClick={() => toggleFavorite(movie._id)}>Remove</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

FavoriteMovies.propTypes = {
  favMovies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      ImagePath: PropTypes.string,
    })
  ).isRequired,
  toggleFavorite: PropTypes.func.isRequired, // Function to handle favorite toggle
};
