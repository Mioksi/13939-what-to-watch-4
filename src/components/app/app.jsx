import React from 'react';
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

const mapStateToProps = (state) => ({
  activeFilm: getSelectedMovie(state),
});

export {App};
export default connect(mapStateToProps)(App);
