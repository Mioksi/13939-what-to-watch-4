import React from "react";
import renderer from "react-test-renderer";

import Main from './main';
import {Movie, MOVIE_TITLES} from '../../common/consts';

it(`Should Main render correctly`, () => {
  const tree = renderer
    .create(<Main
      movieTitle={Movie.TITLE}
      movieGenre={Movie.GENRE}
      movieYear={Movie.YEAR}
      cardTitles={MOVIE_TITLES}
      onCardTitleClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
