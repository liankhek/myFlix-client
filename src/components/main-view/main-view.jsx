import { useState, useEffect } from 'react'; 
import MovieCard from '../movie-card/movie-card'; 
import MovieView from '../movie-view/movie-view';

export const MainView = () => {
  const [movies, setMovies] = useState([]); // Replace hardcoded movies with state
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    // Fetch movies data from the API
    fetch('https://your-myflix-api.herokuapp.com/movies')
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error('Error fetching movies:', error));
  }, []); // Empty dependency array to run once on mount

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
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
