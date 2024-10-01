import React from 'react';
import PropTypes from 'prop-types';
import { MovieCard } from '../movie-card/movie-card';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Add favorite icons

export const MovieView = ({ movie, similarMovies, isFavorite, toggleFavorite }) => {
  const navigate = useNavigate();

  if (!movie) return null;

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
              <div className="text-center">No similar movies available</div>
            ) : (
              similarMovies.map((similarMovie) => (
                <Col md={3} key={similarMovie._id} className="mb-4">
                  <MovieCard movie={similarMovie} />
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
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.string,
    Director: PropTypes.string,
    DirectorBio: PropTypes.string,
    DirectorBirth: PropTypes.string,
    DirectorDeath: PropTypes.string,
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool,
  }).isRequired,
  similarMovies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
    })
  ).isRequired,
  isFavorite: PropTypes.bool.isRequired, // For the favorite icon state
  toggleFavorite: PropTypes.func.isRequired, // For toggling the favorite status
};
