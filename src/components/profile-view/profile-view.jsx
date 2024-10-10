import React from 'react';
import { FavoriteMovies } from './favorite-movies';
import PropTypes from 'prop-types';

export const ProfileView = ({ user, favoriteMovies, movies, toggleFavorite }) => {
  const userFavoriteMovies = movies.filter((movie) => favoriteMovies.includes(movie._id));

  return (
    <div>
      <h3>Favorite Movies</h3>
      <FavoriteMovies movies={userFavoriteMovies} toggleFavorite={toggleFavorite} />
    </div>
  );
};

ProfileView.propTypes = {
  user: PropTypes.object.isRequired,
  favoriteMovies: PropTypes.array.isRequired,
  movies: PropTypes.array.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};
