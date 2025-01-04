import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginView, SignupView, MovieView, ProfileView, NavigationBar, MovieCard } from '../components';
import { Container, Row, Col } from 'react-bootstrap';
import { fetchMovies, fetchFavoriteMovies } from '../../services/apiService';
import '../../index.scss';

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (token) {
      fetchMovies(token).then(setMovies).catch(console.error);
      if (user.Username) {
        fetchFavoriteMovies(user.Username, token).then(data => setFavoriteMovies(data.FavoriteMovies || [])).catch(console.error);
      }
    }
  }, [token, user.Username]);

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
