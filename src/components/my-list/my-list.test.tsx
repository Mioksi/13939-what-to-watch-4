import * as React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import * as renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';

import history from '../../history';
import NameSpace from '../../reducer/name-space';

import {MyList} from './my-list';

import {noop} from '../../common/utils';
import {films} from '../../common/test-data';

const mockStore = configureStore([]);

it(`Should MovieCard render correctly`, () => {
  const store = mockStore({
    [NameSpace.STATE]: {
      shownMoviesCount: 8,
    }
  });

  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <Provider store={store}>
            <MyList
              films={films}
              loadFavoriteFilms={noop}
            />
          </Provider>
        </Router>, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
