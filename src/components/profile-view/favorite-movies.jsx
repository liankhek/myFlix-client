import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const FavoriteMovies = ({ favMovies, onRemoveFavorite }) => {
  if (favMovies.length === 0) {
    return <p className="text-center">You have no favorite movies.</p>;  // Adding some styling here for better UX
  }

  return (
    <div className="favorite-movies-container d-flex flex-wrap justify-content-center">
      {favMovies.map((movie) => (
        <Card key={movie._id} className="favorite-movie-card m-2" style={{ width: '18rem' }}>
          <Card.Img 
            variant="top" 
            src={movie.ImagePath} 
            alt={movie.Title} 
            className="favorite-movie-img"
            style={{ height: '300px', objectFit: 'cover' }}
          />
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
  favMovies: PropTypes.array.isRequired,           // Array of favorite movies
  onRemoveFavorite: PropTypes.func.isRequired,     // Function to handle removal of a favorite
};
