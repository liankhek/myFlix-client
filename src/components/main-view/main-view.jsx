import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { Container, Row, Col, Button } from 'react-bootstrap'; // Import Bootstrap components

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
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
          Genre: movie.Genre?.Name || "Unknown Genre",
          Director: movie.Director?.Name || "Unknown Director",
          ImagePath: movie.ImagePath,
          Featured: movie.Featured,
        }));
        setMovies(moviesFromApi);
      })
      .catch((error) => console.error('Error fetching movies:', error));
  }, [token]);

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
          </Col>
        </Row>
        <div className="text-center mt-3">or</div>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <SignupView />
          </Col>
        </Row>
      </Container>
    );
  }

  if (selectedMovie) {
    return (
      <Container>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
          similarMovies={movies.filter(
            (movie) =>
              movie.Genre === selectedMovie.Genre &&
              movie._id !== selectedMovie._id
          )}
        />
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        {movies.map((movie) => (
          <Col md={3} key={movie._id} className="mb-4">
            <MovieCard
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
          </Col>
        ))}
      </Row>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Button
            variant="danger"
            size="lg"
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
            className="mt-4"
          >
            Logout
          </Button>
        </Col>
      </Row>
    </Container>
  );
};