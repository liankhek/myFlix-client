import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Inception",
      image: "https://c4.wallpaperflare.com/wallpaper/764/590/391/inception-leonardo-dicaprio-movie-posters-2400x3500-entertainment-movies-hd-art-wallpaper-preview.jpg",
      director: "Christopher Nolan",
      genre: "Sci-Fi"
    },
    {
      id: 2,
      title: "The Shawshank Redemption",
      image: "https://w0.peakpx.com/wallpaper/546/10/HD-wallpaper-shawshank-redemption-robbins.jpg",
      director: "Frank Darabont",
      genre: "Drama"
    },
    {
      id: 3,
      title: "Gladiator",
      image: "https://i.pinimg.com/736x/87/7b/a0/877ba0e8628f331632748e4dde000197.jpg",
      director: "Ridley Scott",
      genre: "Action"
    },
    {
      id: 4,
      title: "The Godfather",
      image: "https://wallpapers.com/images/hd/the-godfather-marlon-brando-inpfsuan4nvq56xz.jpg",
      director: "Francis Ford Coppola",
      genre: "Crime"
    },
    {
      id: 5,
      title: "The Dark Knight",
      image: "https://facts.net/wp-content/uploads/2023/06/49-facts-about-the-movie-the-dark-knight-1687243041.jpeg",
      director: "Christopher Nolan",
      genre: "Action"
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView 
        movie={selectedMovie} 
        onBackClick={() => setSelectedMovie(null)} 
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
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
