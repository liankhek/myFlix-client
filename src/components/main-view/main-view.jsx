
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { MovieCard } from '../movie-card/movie-card';
import { Container, Row, Col } from 'react-bootstrap';
import '../../index.scss'; // Import the global styles

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);

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
      .catch((error) => console.error('Error fetching movies:', error));
  }, [token]);

  const onLoggedIn = (user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  };

  const onLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <Router>
      <NavigationBar user={user} onLoggedOut={onLoggedOut} />
      <Container fluid className="app-container">
        <Routes>
          {/* Login Route */}
          <Route
            path="/login"
            element={!user ? <LoginView onLoggedIn={onLoggedIn} /> : <Navigate to="/" />}
          />
          {/* Signup Route */}
          <Route
            path="/signup"
            element={!user ? <SignupView onSignedUp={onLoggedIn} /> : <Navigate to="/" />}
          />
          {/* Movie Details Route */}
          <Route
            path="/movies/:movieId"
            element={user ? <MovieView movies={movies} /> : <Navigate to="/login" />}
          />
          {/* Profile Route */}
          <Route
            path="/profile"
            element={
              user ? <ProfileView user={user} token={token} onLoggedOut={onLoggedOut} /> : <Navigate to="/login" />
            }
          />
          {/* Home Route */}
          <Route
            path="/"
            element={
              user ? (
                <Row className="movie-list">
                  {movies.map((movie) => (
                    <Col md={4} key={movie._id} className="mb-4">
                      <MovieCard movie={movie} />
                    </Col>
                  ))}
                </Row>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/* Catch-all Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </Router>
  );
};
