import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const FavoriteMovies = ({ favMovies, onRemoveFavorite }) => {
  if (favMovies.length === 0) {
    return <p className="text-center">You have no favorite movies.</p>;
  }

  return (
    <Row className="favorite-movies-container">
      {favMovies.map((movie) => (
        <Card key={movie._id} className="favorite-movie-card">
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
            <Button variant="danger" onClick={() => onRemoveFavorite(movie._id)}>Remove</Button>
          </Card.Body>
        </Card>
      ))}
    </Row>
  );
};

FavoriteMovies.propTypes = {
  favMovies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemoveFavorite: PropTypes.func.isRequired, // Function to handle removal
};
