
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MovieCard = ({ movie }) => {
  return (
    <Card className="movie-card">
      <Card.Img variant="top" src={movie.ImagePath} alt={movie.Title} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Link to={`/movies/${movie._id}`}>
          <Button variant="primary">View Details</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.string,
    Director: PropTypes.string,
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool,
  }).isRequired,
};
