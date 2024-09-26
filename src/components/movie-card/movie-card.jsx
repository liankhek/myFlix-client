import React from 'react';
import PropTypes from 'prop-types';

const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div onClick={() => onMovieClick(movie)} style={{ cursor: 'pointer' }}>
      <div>{movie.title}</div>
      <img src={movie.imagePath} alt={`${movie.title} poster`} />  {/* Ensure correct image path */}
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    genre: PropTypes.string,
    director: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

// Add this default export statement
export default MovieCard;