import React from 'react';
import PropTypes from 'prop-types';
import { MovieCard } from '../movie-card/movie-card';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export const MovieView = ({ movies, toggleFavorite, favoriteMovies }) => {
  const navigate = useNavigate();
  const { movieId } = useParams();

  const movie = movies.find((m) => m._id === movieId);

  if (!movie) {
    return (
      <Container className="movie-view-container mt-4 text-center">
        <h2>Movie not found</h2>
        <Button onClick={() => navigate(-1)} variant="primary" className="mt-3">
          Go Back
        </Button>
      </Container>
    );
  }

  // Find similar movies based on Genre
  const similarMovies = movies.filter(
    (m) => m.Genre === movie.Genre && m._id !== movie._id
  );

  const isFavorite = favoriteMovies.includes(movie._id);

  return (
    <Container className="movie-view-container mt-4">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <div className="text-center mb-4">
            <img
              src={movie.ImagePath}
              alt={movie.Title}
              style={{ width: '100%', maxWidth: '700px', height: 'auto', marginBottom: '20px' }}
            />
            {/* Favorite Button */}
            <div className="favorite-icon mt-2">
              {isFavorite ? (
                <FaHeart
                  size={30}
                  color="red"
                  onClick={() => toggleFavorite(movie._id)}
                  style={{ cursor: 'pointer' }}
                />
              ) : (
                <FaRegHeart
                  size={30}
                  color="gray"
                  onClick={() => toggleFavorite(movie._id)}
                  style={{ cursor: 'pointer' }}
                />
              )}
            </div>
          </div>

          <div className="movie-details">
            <h1 className="text-center">{movie.Title}</h1>
            <p className="text-center text-muted">{movie.Genre || 'Unknown Genre'}</p>

            <div className="director-info text-center mb-3">
              <h5>Directed by: {movie.Director || 'Unknown Director'}</h5>
              {movie.DirectorBio && (
                <p className="text-muted">
                  <strong>Bio:</strong> {movie.DirectorBio}
                </p>
              )}
              {movie.DirectorBirth && (
                <p className="text-muted">
                  <strong>Born:</strong> {movie.DirectorBirth}
                </p>
              )}
              {movie.DirectorDeath && (
                <p className="text-muted">
                  <strong>Died:</strong> {movie.DirectorDeath}
                </p>
              )}
            </div>

            <p className="movie-description mb-4">
              {movie.Description}
            </p>

            <div className="text-center mb-4">
              <Button onClick={() => navigate(-1)} variant="primary" className="back-button">
                Back
              </Button>
            </div>
          </div>

          {/* Render Similar Movies */}
          <hr />
          <h2 className="text-center mb-4">Similar Movies</h2>
          <Row className="justify-content-md-center">
            {similarMovies.length === 0 ? (
              <Col>
                <div className="text-center">No similar movies available</div>
              </Col>
            ) : (
              similarMovies.map((similarMovie) => (
                <Col md={3} key={similarMovie._id} className="mb-4">
                  <MovieCard
                    movie={similarMovie}
                    isFavorite={favoriteMovies.includes(similarMovie._id)}
                    toggleFavorite={toggleFavorite}
                  />
                </Col>
              ))
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

MovieView.propTypes = {
  movies: PropTypes.array.isRequired,          // Array of all movies
  toggleFavorite: PropTypes.func.isRequired,   // Function to toggle favorite status
  favoriteMovies: PropTypes.array.isRequired,  // Array of favorite movie IDs
};
