import React from 'react';
import PropTypes from 'prop-types';
import { MovieCard } from '../movie-card/movie-card';

export const ProfileView = ({ user, favoriteMovies, movies, toggleFavorite }) => {
  const userFavoriteMovies = movies.filter((movie) => favoriteMovies.includes(movie._id));

  return (
    <div className="profile-view">
      <h3>Favorite Movies</h3>
      <div className="favorite-movies">
        {userFavoriteMovies.length > 0 ? (
          userFavoriteMovies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              isFavorite={favoriteMovies.includes(movie._id)}
              toggleFavorite={toggleFavorite}
            />
          ))
        ) : (
          <p>No favorite movies yet.</p>
        )}
      </div>
    </div>
  );
};

ProfileView.propTypes = {
  user: PropTypes.object.isRequired,
  favoriteMovies: PropTypes.array.isRequired,
  movies: PropTypes.array.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};
