import React, {PureComponent} from 'react';
import {Switch, Route, BrowserRouter} from "react-router-dom";
import PropTypes from "prop-types";

import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderApp() {
    const {movieTitle, movieGenre, movieYear, movies} = this.props;

    return (
      <Main
        movieTitle={movieTitle}
        movieGenre={movieGenre}
        movieYear={movieYear}
        movies={movies}
        onCardTitleClick={() => {}}
      />
    );
  }

  _renderMoviePage() {
    const {movies, film} = this.props;

    return (
      <MoviePage
        film={film}
        movies={movies}
        onCardTitleClick={() => {}}
      />
    );
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
