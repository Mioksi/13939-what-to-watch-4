import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';

import history from '../../history';

import MovieCard from './movie-card';

import {film} from '../../common/test-data';
import {noop} from '../../common/utils';

it(`Should MovieCard render correctly`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <MovieCard
            movie={film}
            isPlaying={false}
            onCardMouseEnter={noop}
            onCardMouseLeave={noop}
            onStartPlaying={noop}
            onStopPlaying={noop}
          />
        </Router>, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
