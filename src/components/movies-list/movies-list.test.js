import React from "react";
import renderer from "react-test-renderer";

import MoviesList from './movies-list';
import {MOVIES} from '../../common/consts';

it(`Should MoviesList render correctly`, () => {
  const tree = renderer
    .create(<MoviesList
      movies={MOVIES}
      onCardTitleClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
