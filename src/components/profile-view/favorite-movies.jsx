import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const FavoriteMovies = ({ favMovies, removeFavorite }) => {
  if (!favMovies || favMovies.length === 0) {
    return <p>No favorite movies</p>;
  }

  return (
    <div className="movies-container">
      {favMovies.map((movie) => (
        <Card key={movie._id} className="mb-3 movie-card">
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
            <Link to={`/movies/${movie._id}`}>
              <Button variant="primary">Movie Info</Button>
            </Link>
            <Button variant="danger" onClick={() => removeFavorite(movie._id)}>Remove</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

FavoriteMovies.propTypes = {
  favMovies: PropTypes.array.isRequired,
  removeFavorite: PropTypes.func.isRequired,
};
