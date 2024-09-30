import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { Container, Row, Col } from 'react-bootstrap';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [movies, setMovies] = useState([]);

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
          Featured: movie.Featured,
        }));
        setMovies(moviesFromApi);
      });
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
      <Container>
        <Routes>
          <Route
            path="/login"
            element={!user ? <LoginView onLoggedIn={onLoggedIn} /> : <Navigate to="/" />}
          />
          <Route path="/signup" element={<SignupView />} />
          <Route
            path="/"
            element={user ? (
              <Row>
                {movies.map((movie) => (
                  <Col md={4} key={movie._id} className="mb-4">
                    <MovieCard movie={movie} />
                  </Col>
                ))}
              </Row>
            ) : (
              <Navigate to="/login" />
            )}
          />
          <Route
            path="/movies/:movieId"
            element={user ? <MovieView movies={movies} /> : <Navigate to="/login" />}
          />
          <Route
            path="/users/:userId"
            element={user ? <ProfileView user={user} /> : <Navigate to="/login" />}
          />
        </Routes>
      </Container>
    </Router>
  );
};
