import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const FavoriteMovies = ({ favMovies, onRemoveFavorite }) => {
  if (favMovies.length === 0) {
    return <p>No favorite movies.</p>;
  }

  return (
    <div className="favorite-movies-container">
      {favMovies.map((movie) => (
        <Card key={movie._id} className="favorite-movie-card">
          <Card.Img variant="top" src={movie.ImagePath} alt={movie.Title} className="favorite-movie-img" />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Link to={`/movies/${movie._id}`}>
              <Button variant="primary" className="me-2">Movie Info</Button>
            </Link>
            <Button variant="danger" onClick={() => onRemoveFavorite(movie._id)}>
              Remove
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

FavoriteMovies.propTypes = {
  favMovies: PropTypes.array.isRequired,
  onRemoveFavorite: PropTypes.func.isRequired,  // Expecting a function to handle removal
};
