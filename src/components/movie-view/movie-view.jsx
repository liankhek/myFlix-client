import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../movie-card/movie-card';


export const MovieView = ({ movie, onBackClick, similarMovies }) => {
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <img
          src={movie.ImagePath}
          alt={movie.Title}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <strong>Title:</strong> {movie.Title}
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong>Description:</strong> {movie.Description}
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong>Genre:</strong> {movie.Genre.Name}
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong>Director:</strong> {movie.Director.Name}
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong>Bio:</strong> {movie.Director.Bio}
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong>Birth:</strong> {movie.Director.Birth}
      </div>
      {movie.Director.Death && (
        <div style={{ marginBottom: '10px' }}>
          <strong>Death:</strong> {movie.Director.Death}
        </div>
      )}

      <button onClick={onBackClick} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Back
      </button>

      {/* Render Similar Movies */}
      <hr />
      <h2>Similar Movies</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {similarMovies.length === 0 ? (
          <div>No similar movies available</div>
        ) : (
          similarMovies.map((movie) => (
            <div key={movie._id} style={{ width: '150px' }}>
              <MovieCard
                movie={movie}
                onMovieClick={() => console.log('Clicking similar movie')}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string,
      Birth: PropTypes.string,
      Death: PropTypes.string,
    }).isRequired,
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
  similarMovies: PropTypes.array.isRequired,
};

export default MovieView;
