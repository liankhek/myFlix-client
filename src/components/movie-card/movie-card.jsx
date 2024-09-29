import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap'; // Importing Bootstrap components

export const MovieCard = ({ movie, onMovieClick }) => {
  if (!movie) return null; // Check if the movie object exists

  return (
    <Card className="h-100" onClick={() => onMovieClick(movie)} style={{ cursor: 'pointer' }}>
      <Card.Img
        variant="top"
        src={movie.ImagePath}
        alt={movie.Title}
        style={{ height: '270px', objectFit: 'cover' }} // Ensures the image has a fixed height and is well-fitted
      />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Button variant="primary" onClick={() => onMovieClick(movie)}>
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

// Defining propTypes for MovieCard component
MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string,
      Birth: PropTypes.string,
      Death: PropTypes.string,
    }).isRequired,
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
