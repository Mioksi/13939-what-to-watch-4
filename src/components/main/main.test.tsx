import * as React from 'react';
import * as renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';

import history from '../../history';

import {Main} from './main';

import NameSpace from '../../reducer/name-space';
import {ALL_GENRES, AuthorizationStatus} from '../../common/consts';
import {films, film} from '../../common/test-data';
import {noop} from '../../common/utils';

const mockStore = configureStore([]);

it(`Should Main render correctly`, () => {
  const store = mockStore({
    [NameSpace.FILMS]: {
      films,
    },
    [NameSpace.STATE]: {
      genre: ALL_GENRES,
      shownMoviesCount: 8,
      isPlayerActive: false
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
            <Main
              film={film}
              films={films}
              shownMoviesCount={8}
              isLoadingFavoriteFilm={false}
              loadPromoFilm={noop}
              onShowMoreButtonClick={noop}
            />
          </Provider>
        </Router>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
