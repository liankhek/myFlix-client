import React from 'react';
import PropTypes from 'prop-types';
import { MovieCard } from '../movie-card/movie-card';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../../services/apiService';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export const MovieView = ({ movies, favoriteMovies, toggleFavorite }) => {
  const navigate = useNavigate();
  const { movieId } = useParams();

  React.useEffect(() => {
    fetchMovieDetails(movieId).then(movie => {
      // handle setting the movie if needed
    }).catch(error => {
      console.error('Error fetching movie details:', error);
    });
  }, [movieId]);

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
            <Button variant={isFavorite ? "danger" : "success"} onClick={() => toggleFavorite(movie._id, !isFavorite)}>
              {isFavorite ? <FaHeart size={30} /> : <FaRegHeart size={30} />}
            </Button>
          </div>

          <div className="movie-details">
            <h1 className="text-center">{movie.Title}</h1>
            <p className="text-center text-muted">{movie.Genre || 'Unknown Genre'}</p>
            <div className="director-info text-center mb-3">
              <h5>Directed by: {movie.Director || 'Unknown Director'}</h5>
              <p className="text-muted"><strong>Bio:</strong> {movie.DirectorBio}</p>
              <p className="text-muted"><strong>Born:</strong> {movie.DirectorBirth}</p>
              <p className="text-muted"><strong>Died:</strong> {movie.DirectorDeath}</p>
            </div>
            <p className="movie-description mb-4">{movie.Description}</p>
            <Button onClick={() => navigate(-1)} variant="primary" className="back-button">
              Back
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

MovieView.propTypes = {
  movies: PropTypes.array.isRequired,
  favoriteMovies: PropTypes.array.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};
