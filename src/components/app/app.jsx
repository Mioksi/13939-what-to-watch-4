import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getActiveFilmId} from '../../reducer/state/selectors';
import {Operation as UserOperation} from '../../reducer/user/user';

import AddReview from '../add-review/add-review.jsx';
import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import withTabs from '../../hocs/with-tabs/with-tabs';
import withReview from '../../hocs/with-review/with-review';

const MoviePageWrapped = withTabs(MoviePage);
const AddReviewWrapped = withReview(AddReview);

const App = ({activeFilmId, login}) => {
  const renderMain = () => {
    return (
      <Main />
    );
  };

  const renderMoviePage = () => {
    return (
      <MoviePageWrapped />
    );
  };

  const renderApp = () => {
    if (activeFilmId) {
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
            onSubmit={login}
          />
        </Route>
        <Route exact path={`/dev-review`}>
          <AddReviewWrapped />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  activeFilmId: PropTypes.number,
  login: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  activeFilmId: getActiveFilmId(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
