import React, {PureComponent} from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer.js';
import PropTypes from 'prop-types';

import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';
import withTabs from '../../hocs/with-tabs/with-tabs';

const MoviePageWrapped = withTabs(MoviePage);

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: null
    };

    this._handleMovieCardClick = this._handleMovieCardClick.bind(this);
  }

  _handleMovieCardClick(id) {
    this.setState({
      activeCard: id,
    });
  }

  _renderMain() {
    const {film, movies, activeGenre, onGenreClick} = this.props;
    const {title, genre, year} = film;

    return (
      <Main
        movieTitle={title}
        movieGenre={genre}
        movieYear={year}
        movies={movies}
        activeGenre={activeGenre}
        onGenreClick={onGenreClick}
        onCardTitleClick={this._handleMovieCardClick}
        onCardClick={this._handleMovieCardClick}
      />
    );
  }

  _renderMoviePage() {
    const {movies, film, reviews} = this.props;

    return (
      <MoviePageWrapped
        film={film}
        movies={movies}
        reviews={reviews}
        onCardClick={this._handleMovieCardClick}
        onCardTitleClick={this._handleMovieCardClick}
      />
    );
  }

  _renderApp() {
    const {activeCard} = this.state;

    if (activeCard) {
      return this._renderMoviePage();
    }

    return this._renderMain();
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-film">
            {this._renderMoviePage()}
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
  film: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    runTime: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    backgroundPoster: PropTypes.string.isRequired,
    filmPoster: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    ratingCount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.string.isRequired,
  }).isRequired,
  reviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        author: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
  activeGenre: PropTypes.string.isRequired,
  onGenreClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeGenre: state.genre,
  movies: state.movies,
  film: state.film,
  reviews: state.reviews,
});

const mapDispatchToProps = (dispatch) => ({
  onGenreClick(genre) {
    dispatch(ActionCreator.changeGenre(genre));
    dispatch(ActionCreator.getMoviesByGenre(genre));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
