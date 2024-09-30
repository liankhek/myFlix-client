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
          {/* Movie Image */}
          <div className="text-center mb-4">
          <img
            src={movie.ImagePath}
            alt={movie.Title}
            className="img-fluid movie-image"
            style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'contain', marginBottom: '20px' }}
          />
          </div>

          {/* Movie Details */}
          <div className="movie-details">
            <MovieDetail label="Title" value={movie.Title} />
            <MovieDetail label="Description" value={movie.Description} />
            <MovieDetail label="Genre" value={movie.Genre || 'Unknown Genre'} />
            <MovieDetail label="Director" value={movie.Director || 'Unknown Director'} />

            {movie.DirectorBio && <MovieDetail label="Bio" value={movie.DirectorBio} />}
            {movie.DirectorBirth && <MovieDetail label="Birth" value={movie.DirectorBirth} />}
            {movie.DirectorDeath && <MovieDetail label="Death" value={movie.DirectorDeath} />}
          </div>

          {/* Back Button */}
          <div className="text-center mt-3">
            <Button onClick={onBackClick} variant="primary" size="sm">
              Back
            </Button>
          </div>

          {/* Similar Movies Section */}
          <hr />
          <h2 className="text-center">Similar Movies</h2>
          <Row className="justify-content-md-center">
            {similarMovies.length === 0 ? (
              <div className="text-center">No similar movies available</div>
            ) : (
              similarMovies.map((similarMovie) => (
                <Col md={3} key={similarMovie._id} className="mb-4">
                  <MovieCard movie={similarMovie} onMovieClick={() => console.log('Clicking similar movie')} />
                </Col>
              ))
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

// A reusable component for rendering each movie detail
const MovieDetail = ({ label, value }) => (
  <div style={{ marginBottom: '10px' }}>
    <strong>{label}:</strong> {value}
  </div>
);

MovieDetail.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
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
