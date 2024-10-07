import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { MovieCard } from '../movie-card/movie-card';
import { Container, Row, Col } from 'react-bootstrap';
import '../../index.scss';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  useEffect(() => {
    if (!user) return;

    // Fetch favorite movies for the logged-in user
    fetch(`https://da-flix-1a4fa4a29dcc.herokuapp.com/users/${user.Username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setFavoriteMovies(data.FavoriteMovies || []))
      .catch((error) => console.error('Error fetching favorite movies:', error));
  }, [token, user]);

  const onSearch = (term) => {
    setSearchTerm(term);
  };

  const resetSearch = () => {
    setSearchTerm('');
  };

  const toggleFavorite = (movieId) => {
    const isFavorite = favoriteMovies.includes(movieId);
    const method = isFavorite ? 'DELETE' : 'POST';

    fetch(
      `https://da-flix-1a4fa4a29dcc.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: method,
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
      }
    )
      .then((response) => {
        if (response.ok) {
          if (isFavorite) {
            setFavoriteMovies(favoriteMovies.filter((id) => id !== movieId));
          } else {
            setFavoriteMovies([...favoriteMovies, movieId]);
          }
        }  else {
          throw new Error('Failed to update favorites');
        }
      })
      .catch((error) => {
        console.error('Error updating favorite movies:', error);
        alert('Failed to update favorites');
      });
  };

  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div>
      {user && (
        <NavigationBar
          user={user}
          onLoggedOut={onLoggedOut}
          onSearch={onSearch}
          resetSearch={resetSearch}
        />
      )}
      <Container fluid className="app-container">
        <Routes>
          <Route
            path="/login"
            element={!user ? <LoginView onLoggedIn={onLoggedIn} /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <SignupView onSignedUp={onLoggedIn} /> : <Navigate to="/" />}
          />
          <Route
            path="/movies/:movieId"
            element={
              user ? (
                <MovieView
                  movies={movies}
                  favoriteMovies={favoriteMovies}
                  toggleFavorite={toggleFavorite}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/profile"
            element={
              user ? (
                <ProfileView
                  user={user}
                  token={token}
                  favoriteMovies={favoriteMovies}
                  onLoggedOut={onLoggedOut}
                  toggleFavorite={toggleFavorite}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/"
            element={
              user ? (
                <Row className="movie-list">
                  {filteredMovies.length > 0 ? (
                    filteredMovies.map((movie) => (
                      <Col md={3} key={movie._id} className="mb-4">
                        <MovieCard
                          movie={movie}
                          isFavorite={favoriteMovies.includes(movie._id)}
                          toggleFavorite={toggleFavorite}
                        />
                      </Col>
                    ))
                  ) : (
                    <div>No movies found</div>
                  )}
                </Row>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </div>
  );
};
