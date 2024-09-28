import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view.jsx';
import { Container, Col, Row } from 'react-bootstrap';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);

  useEffect(() => {
    if (!token) return;
    fetch('https://da-flix-1a4fa4a29dcc.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          _id: movie._id,
          Title: movie.Title,
          Description: movie.Description,
          Genre: movie.Genre?.Name || 'Unknown Genre',
          Director: movie.Director?.Name || 'Unknown Director',
          ImagePath: movie.ImagePath,
        }));
        setMovies(moviesFromApi);
      })
      .catch((error) => setError(error.message));
  }, [token]);

  if (error) return <div>Error: {error}</div>;

  if (!user) {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }}
            />
            <div className="text-center mt-3">or</div>
            <SignupView />
          </Col>
        </Row>
      </Container>
    );
  }

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
        similarMovies={movies.filter((m) => m.Genre === selectedMovie.Genre)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>No movies available</div>;
  }

  return (
    <Container>
      <Row>
        {movies.map((movie) => (
          <Col md={4} key={movie._id} className="mb-4">
            <MovieCard movie={movie} onMovieClick={setSelectedMovie} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
