import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const FavoriteMovies = ({ favMovies }) => {
  return (
    <div>
      {favMovies.length === 0 ? (
        <p>No favorite movies</p>
      ) : (
        favMovies.map((movie) => (
          <Card key={movie._id} className="mb-3">
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>{movie.director.name}</Card.Text>
              <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                <Button variant="primary">Movie Info</Button>
              </Link>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

FavoriteMovies.propTypes = {
  favMovies: PropTypes.array.isRequired,
};
