import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { Container, Row, Col } from 'react-bootstrap';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
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
      <Router>
        <Routes>
          <Route path="/login" element={<LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token); }} />} />
          <Route path="/signup" element={<SignupView />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <NavigationBar user={user} onLoggedOut={() => { setUser(null); setToken(null); localStorage.clear(); }} />
      <Routes>
        <Route path="/movies/:movieId" element={<MovieView movies={movies} />} />
        <Route path="/profile" element={<ProfileView user={user} token={token} />} />
        <Route path="/" element={
          <Container fluid style={{ maxWidth: '85%' }}>
            <Row>
              {movies.map((movie) => (
                <Col md={4} key={movie._id} className="mb-4">
                  <MovieCard movie={movie} />
                </Col>
              ))}
            </Row>
          </Container>
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};
