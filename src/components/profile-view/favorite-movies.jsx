
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const FavoriteMovies = ({ favMovies }) => {
  if (favMovies.length === 0) {
    return <p>No favorite movies</p>;
  }

  return (
    <div className="favorite-movies">
      {favMovies.map((movie) => (
        <Card key={movie._id} className="movie-card">
          <Card.Img variant="top" src={movie.ImagePath} alt={movie.Title} />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
            <Link to={`/movies/${movie._id}`}>
              <Button variant="primary">Movie Info</Button>
            </Link>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

FavoriteMovies.propTypes = {
  favMovies: PropTypes.array.isRequired,
};
