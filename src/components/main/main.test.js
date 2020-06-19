import React from "react";
import renderer from "react-test-renderer";

import Main from './main';
import {Movie, MOVIES} from '../../common/consts';

it(`Should Main render correctly`, () => {
  const tree = renderer
    .create(<Main
      movieTitle={Movie.TITLE}
      movieGenre={Movie.GENRE}
      movieYear={Movie.YEAR}
      movies={MOVIES}
      onCardTitleClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
