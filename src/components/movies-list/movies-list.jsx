import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import MovieCard from '../movie-card/movie-card.jsx';

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: null,
    };

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

  _getMovie(movie, index, onCardTitleClick, onCardClick) {
    return (
      <MovieCard
        key={`${movie.title}-${index}`}
        movie={movie}
        onCardClick={onCardClick}
        onCardTitleClick={onCardTitleClick}
        onCardMouseEnter={this._onCardMouseEnter}
        onCardMouseLeave={this._onCardMouseLeave}
      />
    );
  }

  _getMovies() {
    const {movies, onCardTitleClick, onCardClick} = this.props;

    return movies.map((movie, index) => this._getMovie(movie, index, onCardTitleClick, onCardClick));
  }

  render() {
    return (
      <div className="catalog__movies-list">
        {this._getMovies()}
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
