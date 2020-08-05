import React from 'react';
import {Switch, Route, Router} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getLoadingFilmsState, getLoadingPromoFilmState} from '../../reducer/films/selectors';

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

const MoviePageWrapped = withTabs(MoviePage);
const AddReviewWrapped = withReview(AddReview);
const FullScreenPlayerWrapped = withFullScreenPlayer(FullScreenPlayer);

const App = ({isLoadingFilms, isLoadingPromoFilm}) => {
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
        <Route exact path={`${AppRoute.FILM}/:id`} render={(routeProps) => {
          const id = Number(routeProps.match.params.id);

          return <MoviePageWrapped id={id} />;
        }}/>
        <Route exact path={`${AppRoute.PLAYER}/:id`} render={(routeProps) => {
          const id = Number(routeProps.match.params.id);

          return <FullScreenPlayerWrapped id={id} />;
        }}/>
        <PrivateRoute exact path={`${AppRoute.FILM}/:id${AppRoute.ADD_REVIEW}`} render={(routeProps) => {
          const id = Number(routeProps.match.params.id);

          return <AddReviewWrapped id={id} />;
        }}/>
      </Switch>
    </Router>
  );
};

App.propTypes = {
  isLoadingFilms: PropTypes.bool.isRequired,
  isLoadingPromoFilm: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isLoadingFilms: getLoadingFilmsState(state),
  isLoadingPromoFilm: getLoadingPromoFilmState(state)
});

export {App};
export default connect(mapStateToProps)(App);
