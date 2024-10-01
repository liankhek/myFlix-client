import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { MovieCard } from '../movie-card/movie-card';
import { Container, Row, Col } from 'react-bootstrap';
import '../../index.scss'; // Import global styles

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

  // Handle user login and saving user/token to localStorage
  const onLoggedIn = (user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  };

  // Handle user logout and clearing localStorage
  const onLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  // Add or Remove favorite movies and persist to server
  const toggleFavorite = (movieId) => {
    const isFavorite = favoriteMovies.includes(movieId);
    const updatedFavorites = isFavorite
      ? favoriteMovies.filter((id) => id !== movieId)
      : [...favoriteMovies, movieId];

    setFavoriteMovies(updatedFavorites);

    // Persist the updated favorites to the backend
    fetch(`https://da-flix-1a4fa4a29dcc.herokuapp.com/users/${user.Username}/favorites/${movieId}`, {
      method: isFavorite ? 'DELETE' : 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update favorites');
        }
      })
      .catch((error) => {
        console.error('Error updating favorites:', error);
        alert('Failed to update favorites. Please try again.');
      });
  };

  // Filter movies based on search term
  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <NavigationBar user={user} onLoggedOut={onLoggedOut} onSearch={(term) => setSearchTerm(term)} />
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
            element={!user ? <SignupView onLoggedIn={onLoggedIn} /> : <Navigate to="/" />}
          />
          {/* Movie Details Route */}
          <Route
            path="/movies/:movieId"
            element={
              user ? (
                <MovieView
                  movies={movies}
                  toggleFavorite={toggleFavorite}
                  favoriteMovies={favoriteMovies}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/* Profile Route */}
          <Route
            path="/profile"
            element={
              user ? (
                <ProfileView
                  user={user}
                  token={token}
                  favoriteMovies={favoriteMovies}
                  movies={movies}
                  onLoggedOut={onLoggedOut}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/* Home Route */}
          <Route
            path="/"
            element={
              user ? (
                <Row className="movie-list">
                  {filteredMovies.length > 0 ? (
                    filteredMovies.map((movie) => (
                      <Col md={4} key={movie._id} className="mb-4">
                        <MovieCard
                          movie={movie}
                          isFavorite={favoriteMovies.includes(movie._id)}
                          toggleFavorite={toggleFavorite}
                        />
                      </Col>
                    ))
                  ) : (
                    <Col>
                      <div className="text-center">No movies found</div>
                    </Col>
                  )}
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
    </>
  );
};
