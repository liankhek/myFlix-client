import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view.jsx";
import { Container, Col, Row} from 'react-bootstrap';



export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);

  useEffect(() => {
    if (!token) return;
    // Fetch movies data from the API
    fetch('https://da-flix-1a4fa4a29dcc.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          _id: movie._id,
          Title: movie.Title,
          Description: movie.Description,
          Genre: movie.Genre?.Name || "Unknown Genre", // Adjusted
          Director: movie.Director?.Name || "Unknown Director", // Adjusted
          ImagePath: movie.ImagePath,
          Featured: movie.Featured,
        }));
        setMovies(moviesFromApi);
      })
      .catch((error) => console.error('Error fetching movies:', error));
  }, [token]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        {!user ? (
          <Col md={6}>
            <LoginView onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }} />
            <div className="text-center mt-3">or</div>
            <SignupView />
          </Col>
        ) : selectedMovie ? (
          <Col md={8}>
            <MovieView
              movie={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
              similarMovies={similarMovies}
            />
          </Col>
        ) : (
          movies.length === 0 ? (
            <div>The list is empty!</div>
          ) : (
            <Row>
              {movies.map((movie) => (
                <Col md={4} className="mb-4" key={movie._id}>
                  <MovieCard movie={movie} onMovieClick={setSelectedMovie} />
                </Col>
              ))}
            </Row>
          )
        )}
      </Row>
    </Container>
  );
};
