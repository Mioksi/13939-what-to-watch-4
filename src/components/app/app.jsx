import React from 'react';
import {Switch, Route, Router} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getLoadingFilmsState, getLoadingPromoFilmState} from '../../reducer/state/selectors';

import AddReview from '../add-review/add-review.jsx';
import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import PrivateRoute from '../private-route/private-route.jsx';
import Preloader from '../preloader/preloader.jsx';
import FullScreenPlayer from '../full-screen-player/full-screen-player.jsx';

import withTabs from '../../hocs/with-tabs/with-tabs';
import withFullScreenPlayer from '../../hocs/with-full-screen-player/with-full-screen-player';
import withReview from '../../hocs/with-review/with-review';

import history from '../../history';

import {AppRoute} from '../../common/consts';
import {ActionCreator} from '../../reducer/state/state';

const MoviePageWrapped = withTabs(MoviePage);
const AddReviewWrapped = withReview(AddReview);
const FullScreenPlayerWrapped = withFullScreenPlayer(FullScreenPlayer);

const App = ({setActiveFilmId, isLoadingFilms, isLoadingPromoFilm}) => {
  const setFilmId = (match) => {
    const filmId = Number(match.params.id);

    setActiveFilmId(filmId);
  };

  if (isLoadingFilms || isLoadingPromoFilm) {
    return <Preloader />;
  }

  return (
    <Router history={history}>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <Main />
        </Route>
        <Route exact path={AppRoute.LOGIN}>
          <SignIn />
        </Route>
        <Route exact path={`${AppRoute.FILM}/:id`} render={({match}) => {
          setFilmId(match);

          return <MoviePageWrapped />;
        }}/>
        <Route exact path={`${AppRoute.PLAYER}/:id`} render={({match}) => {
          setFilmId(match);

          return <FullScreenPlayerWrapped />;
        }}/>
        <PrivateRoute exact path={`${AppRoute.FILM}/:id${AppRoute.ADD_REVIEW}`} render={(match) => {
          setFilmId(match);

          return <AddReviewWrapped />;
        }}/>
      </Switch>
    </Router>
  );
};

App.propTypes = {
  setActiveFilmId: PropTypes.func.isRequired,
  isLoadingFilms: PropTypes.bool.isRequired,
  isLoadingPromoFilm: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isLoadingFilms: getLoadingFilmsState(state),
  isLoadingPromoFilm: getLoadingPromoFilmState(state)
});

const mapDispatchToProps = (dispatch) => ({
  setActiveFilmId(id) {
    dispatch(ActionCreator.getActiveFilmId(id));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
