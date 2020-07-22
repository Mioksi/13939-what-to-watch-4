import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

import {getSelectedMovie} from '../../reducer/state/selectors';

import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';
import withTabs from '../../hocs/with-tabs/with-tabs';
import {connect} from 'react-redux';

const MoviePageWrapped = withTabs(MoviePage);

const App = ({activeFilm}) => {
  const renderMain = () => {
    return (
      <Main />
    );
  };

  const renderMoviePage = () => {
    return (
      <MoviePageWrapped
        film={activeFilm}
      />
    );
  };

  const renderApp = () => {
    if (activeFilm) {
      return renderMoviePage();
    }

    return renderMain();
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {renderApp()}
        </Route>
        <Route exact path="/dev-film">
          {renderMoviePage()}
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  activeFilm: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    filmPoster: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    backgroundPoster: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    ratingCount: PropTypes.number.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(
        PropTypes.string.isRequired
    ).isRequired,
    runTime: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    isFavoriteFilm: PropTypes.bool.isRequired
  })
};

const mapStateToProps = (state) => ({
  activeFilm: getSelectedMovie(state),
});

export {App};
export default connect(mapStateToProps)(App);
