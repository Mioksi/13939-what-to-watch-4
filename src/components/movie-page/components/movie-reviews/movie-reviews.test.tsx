import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {MovieReviews} from './movie-reviews';

import {noop} from '../../../../common/utils';
import {reviews, film} from '../../../../common/test-data';

it(`Should MovieReviews render correctly`, () => {
  const tree = renderer
    .create(<MovieReviews
      reviews={reviews}
      film={film}
      getFilmComments={noop}
      isLoadingComments={true}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
