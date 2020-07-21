import React from 'react';
import PropTypes from 'prop-types';

import MovieCard from '../movie-card/movie-card.jsx';
import withVideoPlayer from '../../hocs/with-video-player/with-video-player';

const MovieCardWrapper = withVideoPlayer(MovieCard);

const MoviesList = ({movies, onCardMouseEnter, onCardMouseLeave}) => {
  const getMovie = (movie, index) => {
    return (
      <MovieCardWrapper
        key={`${movie.title}-${index}`}
        movie={movie}
        onCardMouseEnter={onCardMouseEnter}
        onCardMouseLeave={onCardMouseLeave}
      />
    );
  };

  const getMovies = () => movies.map(getMovie);

  return (
    <div className="catalog__movies-list">
      {getMovies(movies)}
    </div>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
  onCardMouseEnter: PropTypes.func.isRequired,
  onCardMouseLeave: PropTypes.func.isRequired,
};

export default MoviesList;
