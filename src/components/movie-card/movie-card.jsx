export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div onClick={() => onMovieClick(movie)} style={{ cursor: 'pointer' }}>
      <div>{movie.title}</div>
    </div>
  );
};
