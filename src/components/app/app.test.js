import React from "react";
import renderer from "react-test-renderer";

import App from "./app.jsx";
import {Movie, MOVIE_TITLES} from '../../common/consts';

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      movieTitle={Movie.TITLE}
      movieGenre={Movie.GENRE}
      movieYear={Movie.YEAR}
      cardTitles={MOVIE_TITLES}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
