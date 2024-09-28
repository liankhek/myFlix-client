import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { Container, Col, Row } from 'react-bootstrap';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser || null);  // Ensure default value is null
  const [token, setToken] = useState(storedToken || null);  // Ensure default value is null
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return; // Skip fetching if there's no token

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

  // Show error if there is any
  if (error) return <div>Error: {error}</div>;

  // If no user is logged in, show LoginView and SignupView
  return (
    <Container>
      <Row className="justify-content-md-center">
        {!user ? (
          <Col md={6}>
            <LoginView onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }} />
            <div className="text-center mt-3">or</div>
            <SignupView />
          </Col>
        ) : selectedMovie ? (
          <Col md={8}>
            <MovieView
              movie={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
              similarMovies={similarMovies}
            />
          </Col>
        ) : (
          movies.length === 0 ? (
            <div>The list is empty!</div>
          ) : (
            <Row>
              {movies.map((movie) => (
                <Col md={4} className="mb-4" key={movie._id}>
                  <MovieCard movie={movie} onMovieClick={setSelectedMovie} />
                </Col>
              ))}
            </Row>
          )
        )}
      </Row>
    </Container>
  );
};
