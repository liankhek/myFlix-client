import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../movie-card/movie-card';  // Make sure to import MovieCard

const MovieView = ({ movie, onBackClick, similarMovies }) => {
  return (
    <div>
      <div>
        <img src={movie.imagePath} alt={`${movie.title} poster`} />  {/* Ensure you're using the correct prop */}
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
    imagePath: PropTypes.string,  // Ensure correct image prop name
    genre: PropTypes.string,
    director: PropTypes.string,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
  similarMovies: PropTypes.array.isRequired,  // Ensure that similarMovies is required
};

export default MovieView;
