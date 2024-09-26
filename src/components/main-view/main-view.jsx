import { useState, useEffect } from 'react'; 
import MovieCard from '../movie-card/movie-card'; 
import MovieView from '../movie-view/movie-view';

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    // Fetch movies data from the API
    fetch('https://da-flix-1a4fa4a29dcc.herokuapp.com/movies')
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error('Error fetching movies:', error));
  }, []); // Empty dependency array to run once on mount

  // Filter similar movies based on genre
  const similarMovies = selectedMovie
    ? movies.filter((movie) => movie.genre === selectedMovie.genre && movie._id !== selectedMovie._id)
    : [];

  if (selectedMovie) {
    return (
      <MovieView 
        movie={selectedMovie} 
        onBackClick={() => setSelectedMovie(null)}
        similarMovies={similarMovies} // Pass the similar movies
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => setSelectedMovie(newSelectedMovie)}
        />
      ))}
    </div>
  );
};
