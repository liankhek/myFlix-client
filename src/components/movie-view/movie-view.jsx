import React from 'react';
import PropTypes from 'prop-types';
import { MovieCard } from '../movie-card/movie-card';
import { Container, Row, Col, Button } from 'react-bootstrap';

export const MovieView = ({ movie, onBackClick, similarMovies }) => {
  if (!movie) return null;

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <div className="text-center">
            <img
              src={movie.ImagePath}
              alt={movie.Title}
              style={{ width: '100%', maxWidth: '500px', height: 'auto', marginBottom: '20px' }}
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

          <div className="text-center">
            <Button onClick={onBackClick} variant="primary" style={{ fontSize: '14px', padding: '10px 20px' }}>
              Back
            </Button>
          </div>

          {/* Render Similar Movies */}
          <hr />
          <h2 className="text-center">Similar Movies</h2>
          <Row className="justify-content-md-center">
            {similarMovies.length === 0 ? (
              <div className="text-center">No similar movies available</div>
            ) : (
              similarMovies.map((similarMovie) => (
                <Col md={3} key={similarMovie._id} className="mb-4">
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
    Genre: PropTypes.string,
    Director: PropTypes.string,
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
