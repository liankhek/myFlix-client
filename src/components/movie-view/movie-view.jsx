import React from 'react';
import PropTypes from 'prop-types';
import { MovieCard } from '../movie-card/movie-card';
import { Button, Row, Col, Container } from 'react-bootstrap';

export const MovieView = ({ movie, onBackClick, similarMovies }) => {
  if (!movie) return null;

  return (
    <Container className="my-4">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <div className="text-center mb-4">
            <img
              src={movie.ImagePath}
              alt={movie.Title}
              className="img-fluid"
              style={{ maxHeight: '400px' }}
            />
          </div>

          <div className="mb-3">
            <h4><strong>Title:</strong> {movie.Title}</h4>
          </div>
          <div className="mb-3">
            <p><strong>Description:</strong> {movie.Description}</p>
          </div>
          <div className="mb-3">
            <p><strong>Genre:</strong> {movie.Genre || 'Unknown Genre'}</p>
          </div>
          <div className="mb-3">
            <p><strong>Director:</strong> {movie.Director || 'Unknown Director'}</p>
          </div>

          {/* Optional Director Details */}
          {movie.DirectorBio && (
            <div className="mb-3">
              <p><strong>Bio:</strong> {movie.DirectorBio}</p>
            </div>
          )}
          {movie.DirectorBirth && (
            <div className="mb-3">
              <p><strong>Birth:</strong> {movie.DirectorBirth}</p>
            </div>
          )}
          {movie.DirectorDeath && (
            <div className="mb-3">
              <p><strong>Death:</strong> {movie.DirectorDeath}</p>
            </div>
          )}

          <Button
            variant="primary"
            onClick={onBackClick}
            className="mb-4"
          >
            Back
          </Button>

          {/* Render Similar Movies */}
          <hr />
          <h4 className="mb-3">Similar Movies</h4>
          <Row>
            {similarMovies.length === 0 ? (
              <Col>
                <div>No similar movies available</div>
              </Col>
            ) : (
              similarMovies.map((similarMovie) => (
                <Col key={similarMovie._id} md={4} className="mb-4">
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
