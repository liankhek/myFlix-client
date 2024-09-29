import React from 'react';
import PropTypes from 'prop-types';
import { MovieCard } from '../movie-card/movie-card';
import { Container, Row, Col, Button } from 'react-bootstrap'; // Import Bootstrap components

export const MovieView = ({ movie, onBackClick, similarMovies }) => {
  if (!movie) return null;

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <div className="mb-4">
            <img
              src={movie.ImagePath}
              alt={movie.Title}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>

          <div className="mb-2">
            <strong>Title:</strong> {movie.Title}
          </div>
          <div className="mb-2">
            <strong>Description:</strong> {movie.Description}
          </div>
          <div className="mb-2">
            <strong>Genre:</strong> {movie.Genre || 'Unknown Genre'}
          </div>
          <div className="mb-2">
            <strong>Director:</strong> {movie.Director || 'Unknown Director'}
          </div>

          {/* Optional Director Details */}
          {movie.DirectorBio && (
            <div className="mb-2">
              <strong>Bio:</strong> {movie.DirectorBio}
            </div>
          )}
          {movie.DirectorBirth && (
            <div className="mb-2">
              <strong>Birth:</strong> {movie.DirectorBirth}
            </div>
          )}
          {movie.DirectorDeath && (
            <div className="mb-2">
              <strong>Death:</strong> {movie.DirectorDeath}
            </div>
          )}

          <Button variant="primary" onClick={onBackClick} className="mb-4">
            Back
          </Button>
        </Col>
      </Row>

      <hr />
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h3>Similar Movies</h3>
          <Row>
            {similarMovies.length === 0 ? (
              <Col>
                <p>No similar movies available</p>
              </Col>
            ) : (
              similarMovies.map((similarMovie) => (
                <Col key={similarMovie._id} xs={6} md={4} className="mb-3">
                  <MovieCard
                    movie={similarMovie}
                    onMovieClick={() => console.log('Clicking similar movie')}
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
