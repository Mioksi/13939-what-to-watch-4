import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

import {getSelectedFilm} from '../../reducer/state/selectors';

import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import withTabs from '../../hocs/with-tabs/with-tabs';
import {connect} from 'react-redux';

const MoviePageWrapped = withTabs(MoviePage);

const App = ({activeFilm: id}) => {
  const renderMain = () => {
    return (
      <Main/>
    );
  };

  const renderMoviePage = () => {
    return (
      <MoviePageWrapped />
    );
  };

  const renderApp = () => {
    if (id) {
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
        <Route exact path="/auth">
          <SignIn
            onSubmit={() => {}}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  activeFilm: PropTypes.shape({
    id: PropTypes.number.isRequired
  })
};

const mapStateToProps = (state) => ({
  activeFilm: getSelectedFilm(state),
});

export {App};
export default connect(mapStateToProps)(App);
