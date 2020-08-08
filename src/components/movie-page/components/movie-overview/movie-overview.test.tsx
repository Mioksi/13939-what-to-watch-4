import * as React from 'react';
import * as renderer from 'react-test-renderer';

import MovieOverview from './movie-overview';

import {film} from '../../../../common/test-data';

it(`Should MovieOverview render correctly`, () => {
  const {description, director, rating, [`scores_count`]: ratingCount, starring} = film;

  const tree = renderer
    .create(<MovieOverview
      description={description}
      director={director}
      rating={rating}
      ratingCount={ratingCount}
      starring={starring}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
