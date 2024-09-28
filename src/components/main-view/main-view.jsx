import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { Container, Col, Row } from 'react-bootstrap';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser || null);  // Ensure default value is null
  const [token, setToken] = useState(storedToken || null);  // Ensure default value is null
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return; // Skip fetching if there's no token

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
      .catch((error) => setError(error.message));
  }, [token]);

  // Show error if there is any
  if (error) return <div>Error: {error}</div>;

  // If no user is logged in, show LoginView and SignupView
  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <Col md={5}>
          <LoginView onLoggedIn={(user) => setUser(user)} />
          <div className="mt-3">or</div>
          <SignupView />
        </Col>
      ) : selectedBook ? (
        <Col md={8}>
          <BookView
            style={{ border: "1px solid green" }}
            book={selectedBook}
            onBackClick={() => setSelectedBook(null)}
          />
        </Col>
      ) : books.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          {books.map((book) => (
            <Col className="mb-4" key={book.id} md={3}>
              <BookCard
                book={book}
                onBookClick={(newSelectedBook) => {
                  setSelectedBook(newSelectedBook);
                }}
              />
            </Col>
          ))}
        </>
      )}
    </Row>
  );
};
