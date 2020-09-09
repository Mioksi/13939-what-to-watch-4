import * as React from 'react';
import {Switch, Route, HashRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {getLoadingFilmsState, getLoadingPromoFilmState} from '../../reducer/films/selectors';

import AddReview from '../add-review/add-review';
import Main from '../main/main';
import MoviePage from '../movie-page/movie-page';
import SignIn from '../sign-in/sign-in';
import PrivateRoute from '../private-route/private-route';
import MyList from '../my-list/my-list';
import Preloader from '../preloader/preloader';
import FullScreenPlayer from '../full-screen-player/full-screen-player';

import withTabs from '../../hocs/with-tabs/with-tabs';
import withFullScreenPlayer from '../../hocs/with-full-screen-player/with-full-screen-player';
import withReview from '../../hocs/with-review/with-review';

import {IAppProps} from './types';

import {AppRoute, RoutePath} from '../../common/consts';

const MoviePageWrapped = withTabs(MoviePage);
const AddReviewWrapped = withReview(AddReview);
const FullScreenPlayerWrapped = withFullScreenPlayer(FullScreenPlayer);

const App: React.FC<IAppProps> = ({isLoadingFilms, isLoadingPromoFilm}: IAppProps) => {
  if (isLoadingFilms || isLoadingPromoFilm) {
    return <Preloader />;
  }

  return (
    <HashRouter>
      <Switch>
        <Route
          exact
          path={AppRoute.ROOT}
          render={(routeProps) => {
            return <Main history={routeProps.history} />;
          }}
        >
        </Route>
        <Route exact path={AppRoute.LOGIN}>
          <SignIn />
        </Route>
        <Route exact path={RoutePath.FILM} render={(routeProps) => {
          const id = Number(routeProps.match.params.id);

          return <MoviePageWrapped
            id={id}
            history={routeProps.history}
          />;
        }}/>
        <Route exact path={RoutePath.PLAYER} render={(routeProps) => {
          const id = Number(routeProps.match.params.id);

          return <FullScreenPlayerWrapped id={id} />;
        }}/>
        <PrivateRoute exact path={RoutePath.ADD_REVIEW} render={(routeProps) => {
          const id = Number(routeProps.match.params.id);
          return <AddReviewWrapped
            id={id}
            history={routeProps.history}
          />;
        }}/>
        <PrivateRoute exact path={AppRoute.MY_LIST} render={() => <MyList />} />
      </Switch>
    </HashRouter>
  );
};

const mapStateToProps = (state): IAppProps => ({
  isLoadingFilms: getLoadingFilmsState(state),
  isLoadingPromoFilm: getLoadingPromoFilmState(state)
});

export {App};
export default connect(mapStateToProps)(App);
