import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

export const MovieCard = ({ movie, onMovieClick }) => {
  if (!movie) return null;

  return (
    <Card style={{ width: '100%' }} className="h-100">
      <Card.Img
        variant="top"
        src={movie.ImagePath}
        alt={movie.Title}
        style={{
          objectFit: 'cover',
          height: '400px', // Increased height for better aspect ratio
          width: '100%' // Ensure the width fills the card
        }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text className="flex-grow-1">{movie.Description}</Card.Text>
        <Button variant="primary" onClick={() => onMovieClick(movie)} className="mt-auto">
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

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
