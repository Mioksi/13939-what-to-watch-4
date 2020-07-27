import React from 'react';
import renderer from 'react-test-renderer';

import {AddReview} from './add-review.jsx';

const film = {
  name: `The Grand Budapest Hotel`,
  [`background_image`]: `img/bg-the-grand-budapest-hotel.jpg`,
  [`poster_image`]: `img/the-grand-budapest-hotel-poster.jpg`
};

it(`AddReview component render correctly`, () => {
  const tree = renderer.create(
      <AddReview
        film={film}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
