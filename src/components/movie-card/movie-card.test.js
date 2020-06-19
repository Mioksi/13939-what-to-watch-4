import React from "react";
import renderer from "react-test-renderer";

import MovieCard from './movie-card';

const movie = {
  id: 1,
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
};

it(`Should MovieCard render correctly`, () => {
  const tree = renderer
    .create(<MovieCard
      movie={movie}
      onCardTitleClick={() => {}}
      onCardMouseEnter={() => {}}
      onCardMouseLeave={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
