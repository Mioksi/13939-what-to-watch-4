import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';

import history from '../../history';

import {AddReview} from './add-review.jsx';

const film = {
  id: 1,
  name: `The Grand Budapest Hotel`,
  [`background_image`]: `img/bg-the-grand-budapest-hotel.jpg`,
  [`poster_image`]: `img/the-grand-budapest-hotel-poster.jpg`
};

it(`AddReview component render correctly`, () => {
  const tree = renderer.create(
      <Router
        history={history}
      >
        <AddReview
          film={film}
          onRatingChange={() => {}}
          onCommentChange={() => {}}
          onSubmit={() => {}}
        />
      </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
