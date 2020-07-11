import React from 'react';
import renderer from 'react-test-renderer';

import MoviesList from './movies-list.jsx';
import {MOVIES} from '../../common/consts';

it(`Should MoviesList render correctly`, () => {
  const tree = renderer
    .create(<MoviesList
      movies={MOVIES}
      onCardClick={() => {}}
      onCardTitleClick={() => {}}
      onCardMouseEnter={() => {}}
      onCardMouseLeave={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
