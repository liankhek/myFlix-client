import React, { useState, useEffect } from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    // Fetch movies data from the API
    fetch('https://da-flix-1a4fa4a29dcc.herokuapp.com/movies')
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          _id: movie._id,
          Title: movie.Title,
          Description: movie.Description,
          Genre: movie.Genre,
          Director: movie.Director,
          ImagePath: movie.ImagePath,
          Featured: movie.Featured,
        }));
        setMovies(moviesFromApi);
      })
      .catch((error) => console.error('Error fetching movies:', error));
  }, []);

  if (selectedMovie) {
    const similarMovies = movies.filter(
      (movie) => movie.Genre.Name === selectedMovie.Genre.Name && movie._id !== selectedMovie._id
    );

    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
        similarMovies={similarMovies}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {movies.map((movie) => (
        <div key={movie._id} style={{ width: '200px' }}>
          <MovieCard
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        </div>
      ))}
    </div>
  );
};
