import * as React from 'react';
import * as renderer from 'react-test-renderer';

import MovieReview from './movie-review';

import {review} from '../../../../../common/test-data';


it(`Should MovieReview render correctly`, () => {
  const {user, rating, comment, date} = review;
  const {name} = user;

  const tree = renderer
    .create(
        <MovieReview
          name={name}
          rating={rating}
          comment={comment}
          date={date}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
