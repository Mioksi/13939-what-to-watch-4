import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import MovieCard from '../movie-card/movie-card.jsx';
import withVideoPlayer from '../../hocs/with-video-player/with-video-player';

const MovieCardWrapper = withVideoPlayer(MovieCard);

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: null,
    };

    this._getMovie = this._getMovie.bind(this);
    this._onCardMouseEnter = this._onCardMouseEnter.bind(this);
    this._onCardMouseLeave = this._onCardMouseLeave.bind(this);
  }

  _onCardMouseEnter(id) {
    this.setState({
      activeCard: id,
    });
  }

  _onCardMouseLeave() {
    this.setState({
      activeCard: null,
    });
  }

  _getMovie(movie, index) {
    const {onCardTitleClick, onCardClick} = this.props;

    return (
      <MovieCardWrapper
        key={`${movie.title}-${index}`}
        movie={movie}
        onCardClick={onCardClick}
        onCardTitleClick={onCardTitleClick}
        onCardMouseEnter={this._onCardMouseEnter}
        onCardMouseLeave={this._onCardMouseLeave}
      />
    );
  }

  _getMovies(movies) {
    return movies.map(this._getMovie);
  }

  render() {
    const {movies} = this.props;

    return (
      <div className="catalog__movies-list">
        {this._getMovies(movies)}
      </div>
    );
  }
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

export default MoviesList;
