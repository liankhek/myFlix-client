import React from 'react';
import PropTypes from 'prop-types';
import { MovieCard } from '../movie-card/movie-card';

export const MovieView = ({ movie, onBackClick, similarMovies }) => {
  if (!movie) return null;

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
        <strong>Genre:</strong> {movie.Genre || 'Unknown Genre'}
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong>Director:</strong> {movie.Director || 'Unknown Director'}
      </div>

      {/* Optional Director Details */}
      {movie.DirectorBio && (
        <div style={{ marginBottom: '10px' }}>
          <strong>Bio:</strong> {movie.DirectorBio}
        </div>
      )}
      {movie.DirectorBirth && (
        <div style={{ marginBottom: '10px' }}>
          <strong>Birth:</strong> {movie.DirectorBirth}
        </div>
      )}
      {movie.DirectorDeath && (
        <div style={{ marginBottom: '10px' }}>
          <strong>Death:</strong> {movie.DirectorDeath}
        </div>
      )}

      <button
        onClick={onBackClick}
        style={{ padding: '10px 20px', cursor: 'pointer' }}
      >
        Back
      </button>

      {/* Render Similar Movies */}
      <hr />
      <h2>Similar Movies</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {similarMovies.length === 0 ? (
          <div>No similar movies available</div>
        ) : (
          similarMovies.map((similarMovie) => (
            <div key={similarMovie._id} style={{ width: '150px' }}>
              <MovieCard
                movie={similarMovie}
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
    Genre: PropTypes.string, // Now a string, since we adjusted it in main-view.jsx
    Director: PropTypes.string, // Now a string
    DirectorBio: PropTypes.string,
    DirectorBirth: PropTypes.string,
    DirectorDeath: PropTypes.string,
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
  similarMovies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
    })
  ).isRequired,
};
