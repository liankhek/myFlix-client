import React from 'react';
import PropTypes from 'prop-types';

const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div onClick={() => onMovieClick(movie)} style={{ cursor: 'pointer' }}>
      <div>{movie.title}</div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

// Export as default
export default MovieCard;
