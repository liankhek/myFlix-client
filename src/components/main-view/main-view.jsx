import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { MovieCard } from '../movie-card/movie-card';
import { Container, Row, Col } from 'react-bootstrap';
import { fetchMovies, fetchFavoriteMovies } from '../../services/apiService';
import '../../index.scss';

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (token && user && user.Username) { // Ensures that user and token are not null before fetching
      fetchMovies(token).then(setMovies).catch(console.error);
      fetchFavoriteMovies(user.Username, token)
        .then(data => setFavoriteMovies(data.FavoriteMovies || []))
        .catch(console.error);
    }
  }, [token, user.Username]); // user.Username needs to be checked for validity before running this effect

  const toggleFavorite = (movieId) => {
    if (!user || !user.Username) return; // Additional check before proceeding to toggle favorite
    const isAdd = !favoriteMovies.includes(movieId);
    updateFavoriteMovie(user.Username, movieId, token, isAdd)
      .then(() => {
        setFavoriteMovies(prev => isAdd ? [...prev, movieId] : prev.filter(id => id !== movieId));
      })
      .catch(console.error);
  };

  const filteredMovies = movies.filter(movie => movie.Title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Container fluid className="app-container">
      <NavigationBar user={user} onLoggedOut={() => { setUser(null); setToken(null); localStorage.clear(); }} onSearch={setSearchTerm} />
      <Routes>
        <Route path="/login" element={!user ? <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token); localStorage.setItem('user', JSON.stringify(user)); localStorage.setItem('token', token); }} /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <SignupView onSignedUp={(user, token) => { setUser(user); setToken(token); localStorage.setItem('user', JSON.stringify(user)); localStorage.setItem('token', token); }} /> : <Navigate to="/" />} />
        <Route path="/movies/:movieId" element={user ? <MovieView movies={movies} favoriteMovies={favoriteMovies} toggleFavorite={toggleFavorite} /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <ProfileView user={user} token={token} favoriteMovies={favoriteMovies} onLoggedOut={() => { setUser(null); setToken(null); localStorage.clear(); }} toggleFavorite={toggleFavorite} /> : <Navigate to="/login" />} />
        <Route path="/" element={user ? <Row className="movie-list">{filteredMovies.length > 0 ? filteredMovies.map(movie => <Col md={3} key={movie._id}><MovieCard movie={movie} isFavorite={favoriteMovies.includes(movie._id)} toggleFavorite={() => toggleFavorite(movie._id)} /></Col>) : <div>No movies found</div>}</Row> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
};