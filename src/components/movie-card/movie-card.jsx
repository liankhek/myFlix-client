import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Import heart icons for favorite functionality

export const MovieCard = ({ movie, isFavorite, toggleFavorite }) => {
  return (
    <Card className="movie-card h-100">
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={movie.ImagePath}
          alt={movie.Title}
          style={{ height: '300px', objectFit: 'cover' }}
        />
        {/* Favorite Button */}
        <div className="favorite-icon position-absolute top-0 end-0 p-2">
          {isFavorite ? (
            <FaHeart
              size={24}
              color="red"
              onClick={() => toggleFavorite(movie._id)}
              style={{ cursor: 'pointer' }}
            />
          ) : (
            <FaRegHeart
              size={24}
              color="gray"
              onClick={() => toggleFavorite(movie._id)}
              style={{ cursor: 'pointer' }}
            />
          )}
        </div>
      </div>

      <Card.Body>
        <Card.Title className="text-truncate">{movie.Title}</Card.Title>
        <Card.Text className="movie-description">
          {movie.Description.length > 120
            ? `${movie.Description.substring(0, 117)}...`
            : movie.Description}
        </Card.Text>
        <Link to={`/movies/${movie._id}`}>
          <Button variant="primary" className="w-100">
            View Details
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.string,
    Director: PropTypes.string,
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool,
  }).isRequired,
  isFavorite: PropTypes.bool.isRequired, // Indicates if the movie is a favorite
  toggleFavorite: PropTypes.func.isRequired, // Function to toggle favorite status
};
