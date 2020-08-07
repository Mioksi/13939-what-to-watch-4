import * as React from 'react';
import * as renderer from 'react-test-renderer';

import MovieDetails from './movie-details';

import {film} from '../../../../common/test-data';

it(`Should MovieDetails render correctly`, () => {
  const {director, genre, [`run_time`]: runTime, starring, released} = film;

  const tree = renderer
    .create(<MovieDetails
      director={director}
      genre={genre}
      runTime={runTime}
      starring={starring}
      year={released}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
