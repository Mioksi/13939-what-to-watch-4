import React, {PureComponent} from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';

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
    const {movieTitle, movieGenre, movieYear, movies} = this.props;

    return (
      <Main
        movieTitle={movieTitle}
        movieGenre={movieGenre}
        movieYear={movieYear}
        movies={movies}
        onCardTitleClick={this._handleMovieCardClick}
        onCardClick={this._handleMovieCardClick}
      />
    );
  }

  _renderMoviePage() {
    const {movies, film} = this.props;

    return (
      <MoviePage
        film={film}
        movies={movies}
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
  movieTitle: PropTypes.string.isRequired,
  movieGenre: PropTypes.string.isRequired,
  movieYear: PropTypes.number.isRequired,
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
    year: PropTypes.number.isRequired,
    backgroundPoster: PropTypes.string.isRequired,
    filmPoster: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    ratingCount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.string.isRequired,
  }).isRequired,
};

export default App;
