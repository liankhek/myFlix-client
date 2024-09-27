import PropTypes from 'prop-types';

export const MovieCard = ({ movie, onMovieClick }) => {
  if (!movie) return null; // Check if movie is defined

  return (
    <div
      onClick={() => onMovieClick(movie)}
      style={{ border: '1px solid #ccc', padding: '16px', cursor: 'pointer' }}
    >
      <img
        src={movie.ImagePath} 
        alt={movie.Title}
        style={{ width: '100%', height: 'auto' }}
      />
      <h3 style={{ fontSize: '1.2rem', textAlign: 'center' }}>{movie.Title}</h3>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string,
      Birth: PropTypes.string,
      Death: PropTypes.string,
    }).isRequired,
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
