import * as React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import * as renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';

import history from '../../history';

import {MoviesList} from './movies-list';

import NameSpace from '../../reducer/name-space';

import {noop} from '../../common/utils';
import {films} from '../../common/test-data';

const mockStore = configureStore([]);

it(`Should MoviesList render correctly`, () => {
  const store = mockStore({
    [NameSpace.FILMS]: {
      films
    }
  });

  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <Provider store={store}>
            <MoviesList
              movies={films}
              shownMoviesCount={8}
              onCardMouseEnter={noop}
              onCardMouseLeave={noop}
            />
          </Provider>
        </Router>, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
