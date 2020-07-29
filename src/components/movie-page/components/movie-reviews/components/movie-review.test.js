import React from 'react';
import renderer from 'react-test-renderer';

import MovieReview from './movie-review.jsx';

const review = {
  name: `Kate Muir`,
  rating: 8.9,
  comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
  date: `2019-05-08T14:13:56.569Z`
};

it(`Should MovieReview render correctly`, () => {
  const {name, rating, comment, date} = review

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
