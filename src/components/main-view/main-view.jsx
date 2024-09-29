import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Container, Row, Col, Button } from 'react-bootstrap';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);
  const [showLogin, setShowLogin] = useState(true);

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

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  if (!user) {
    return (
      <Container className="auth-container">
        <Row className="justify-content-md-center">
          <Col md={8}> {/* Increased form size */}
            {showLogin ? (
              <LoginView
                onLoggedIn={(user, token) => {
                  setUser(user);
                  setToken(token);
                }}
                setShowLogin={setShowLogin}
              />
            ) : (
              <SignupView
                onSignedUp={() => setShowLogin(true)}
                setShowLogin={setShowLogin}
              />
            )}
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
    <Container fluid style={{ maxWidth: '85%' }}>
      <Row>
        {movies.length === 0 ? (
          <div className="text-center">No movies available</div>
        ) : (
          movies.map((movie) => (
            <Col md={4} key={movie._id} className="mb-4">
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))
        )}
      </Row>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Button
            variant="success"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
