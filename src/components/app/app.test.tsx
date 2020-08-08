import * as React from 'react';
import * as renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

import {App} from './app';

import NameSpace from '../../reducer/name-space';
import {ALL_GENRES, AuthorizationStatus} from '../../common/consts';
import {film, films} from '../../common/test-data';

const mockStore = configureStore([]);

it(`Render App`, () => {
  const store = mockStore({
    [NameSpace.FILMS]: {
      films,
      promoFilm: film,
      isLoadingFavoriteFilm: false
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
        <Provider store={store}>
          <App
            isLoadingFilms={false}
            isLoadingPromoFilm={false}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
