import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getFilmsByGenre, getShownMovies} from '../../reducer/state/selectors';

import MovieCard from '../movie-card/movie-card.jsx';
import withVideoPlayer from '../../hocs/with-video-player/with-video-player';

const MovieCardWrapper = withVideoPlayer(MovieCard);

const MoviesList = ({movies, shownMoviesCount, onCardMouseEnter, onCardMouseLeave}) => {
  const shownMovies = movies.slice(0, shownMoviesCount);

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

  const getMovies = () => shownMovies.map(getMovie);

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
        name: PropTypes.string.isRequired,
        [`preview_image`]: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
  shownMoviesCount: PropTypes.number.isRequired,
  onCardMouseEnter: PropTypes.func.isRequired,
  onCardMouseLeave: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movies: getFilmsByGenre(state),
  shownMoviesCount: getShownMovies(state),
});

export {MoviesList};
export default connect(mapStateToProps)(MoviesList);
