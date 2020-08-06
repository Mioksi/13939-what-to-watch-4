import * as React from 'react';
import {connect} from 'react-redux';

import {getShownMovies} from '../../reducer/state/selectors';

import MovieCard from '../movie-card/movie-card';
import withVideoPlayer from '../../hocs/with-video-player/with-video-player';

import {IStateToMoviesListProps, MoviesListProps} from './types';

import {Film} from '../../common/types';

const MovieCardWrapper = withVideoPlayer(MovieCard);

const MoviesList: React.FC<MoviesListProps> = (
    {movies, shownMoviesCount, onCardMouseEnter, onCardMouseLeave}: MoviesListProps) => {

  const shownMovies = movies.slice(0, shownMoviesCount);

  const getMovie = (movie: Film, index: number): React.ReactElement => {
    return (
      <MovieCardWrapper
        key={`${movie.name}-${index}`}
        movie={movie}
        onCardMouseEnter={onCardMouseEnter}
        onCardMouseLeave={onCardMouseLeave}
      />
    );
  };

  const getMovies = shownMovies.map(getMovie);

  return (
    <div className="catalog__movies-list">
      {getMovies}
    </div>
  );
};

const mapStateToProps = (state): IStateToMoviesListProps => ({
  shownMoviesCount: getShownMovies(state),
});

export {MoviesList};
export default connect(mapStateToProps)(MoviesList);
