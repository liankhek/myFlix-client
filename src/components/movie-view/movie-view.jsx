import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../movie-card/movie-card';

export const MovieView = ({ movie, onBackClick, similarMovies }) => {
  return (
    <div>
      <div>
        <img src={movie.image} alt={`${movie.title} poster`} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre}</span>
      </div>
      <button onClick={onBackClick}>Back</button>

      {/* Render Similar Movies */}
      <hr />
      <h2>Similar Movies</h2>
      <div>
        {similarMovies.length === 0 ? (
          <div>No similar movies available</div>
        ) : (
          similarMovies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={(selectedMovie) => console.log('Clicking similar movie')}
            />
          ))
        )}
      </div>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    genre: PropTypes.string,
    director: PropTypes.string,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
  similarMovies: PropTypes.array.isRequired, // Ensure that similarMovies is required
};
