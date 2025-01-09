import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { MovieCard } from '../movie-card/movie-card';
import { Container, Row, Col } from 'react-bootstrap';
import { fetchMovies, fetchFavoriteMovies, updateFavoriteMovie } from '../../services/apiService';
import '../../index.scss';

export const MainView = () => {
  const storedUser = localStorage.getItem('user');
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (token && user) {
      fetchMovies(token).then(setMovies).catch(console.error);
      fetchFavoriteMovies(user.Username, token)
        .then(data => setFavoriteMovies(data.FavoriteMovies || []))
        .catch(console.error);
    }
  }, [token, user]);

  const onLoggedIn = (loggedInUser, authToken) => {
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    localStorage.setItem('token', authToken);
    setUser(loggedInUser);
    setToken(authToken);
  };

  const onLoggedOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  return (
    <Container fluid className="app-container">
      <NavigationBar user={user} onLoggedOut={onLoggedOut} />
      <Routes>
        <Route path="/login" element={!user ? <LoginView onLoggedIn={onLoggedIn} /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <SignupView onSignedUp={onLoggedIn} /> : <Navigate to="/" />} />
        <Route path="/movies/:movieId" element={user ? <MovieView movies={movies} toggleFavorite={updateFavoriteMovie} /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <ProfileView user={user} toggleFavorite={updateFavoriteMovie} /> : <Navigate to="/login" />} />
        <Route path="/" element={user ? movies.map(movie => <MovieCard key={movie._id} movie={movie} toggleFavorite={updateFavoriteMovie} />) : <Navigate to="/login" />} />
      </Routes>
    </Container>
  );
};