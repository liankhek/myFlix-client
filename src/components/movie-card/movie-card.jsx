import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export const MovieCard = ({ movie, isFavorite, toggleFavorite }) => {

  // Function to handle click event on the favorite icon
  const handleFavoriteClick = (e) => {
    e.preventDefault(); // Prevent navigation
    toggleFavorite(movie._id);
  };

  return (
    <Card className="movie-card h-100" style={{ maxWidth: '250px' }}>
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={movie.ImagePath}
          alt={`Poster of ${movie.Title}`}
          style={{ height: '300px', objectFit: 'cover' }}
        />
        <Button 
          className="favorite-icon position-absolute top-0 end-0 p-2"
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          style={{ background: 'none', border: 'none', color: isFavorite ? 'red' : 'gray' }}
        >
          {isFavorite ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
        </Button>
      </div>

      <Card.Body>
        <Card.Title className="text-truncate">{movie.Title}</Card.Title>
        <Card.Text>{movie.Description.substring(0, 100)}...</Card.Text>
        <Link to={`/movies/${movie._id}`}>
          <Button variant="primary">View Details</Button>
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
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};
