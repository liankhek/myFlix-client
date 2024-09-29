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
  const [showLogin, setShowLogin] = useState(true); // Toggle between login and signup

  // Fetch the movies when the token is available
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

  // Handle user logout and clear stored credentials
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  // If the user is not logged in, show the login or signup view
  if (!user) {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6}>
            {showLogin ? (
              <LoginView
                onLoggedIn={(user, token) => {
                  setUser(user);
                  setToken(token);
                }}
                setShowLogin={setShowLogin}  // Pass down setShowLogin to toggle between forms
              />
            ) : (
              <SignupView
                onSignedUp={() => setShowLogin(true)}  // After signup, show the login form
                setShowLogin={setShowLogin}
              />
            )}
            <div className="text-center mt-3">
              <Button
                className="p-0 border-0 bg-transparent primaryColor"
                onClick={() => setShowLogin(!showLogin)}
              >
                {showLogin ? 'Sign Up' : 'Login'}
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  // Show the selected movie's details view
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

  // Display the list of movies if the user is logged in and no movie is selected
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
