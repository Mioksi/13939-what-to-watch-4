import * as React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import * as renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';

import history from '../../history';

import {MoviePage} from './movie-page';

import NameSpace from '../../reducer/name-space';

import {ALL_GENRES, AuthorizationStatus} from '../../common/consts';
import {noop} from '../../common/utils';
import {film, films} from '../../common/test-data';

const mockStore = configureStore([]);

const activeTab = `Overview`;

it(`Should MovieCard render correctly`, () => {
  const store = mockStore({
    [NameSpace.FILMS]: {
      films
    },
    [NameSpace.STATE]: {
      genre: ALL_GENRES,
      shownMoviesCount: 8,
    },
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.NO_AUTH
    }
  });

  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <Provider store={store}>
            <MoviePage
              film={film}
              movies={films}
              activeTab={activeTab}
              authorizationStatus={AuthorizationStatus.NO_AUTH}
              isLoadingFavoriteFilm={false}
              loadFilms={noop}
              renderTabs={noop}
              setActiveFilm={noop}
            />
          </Provider>
        </Router>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
