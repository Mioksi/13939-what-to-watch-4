import React from 'react';
import renderer from 'react-test-renderer';

import {GenresList} from './genres-list.jsx';

const mock = {
  activeGenre: `All genres`,
  genres: [`Family`, `Comedian`, `Drama`],
};

it(`Should GenresList render correctly`, () => {
  const {activeGenre, genres} = mock;

  const tree = renderer
    .create(<GenresList
      allGenres={genres}
      activeGenre={activeGenre}
      onGenreClick={() => {}}
    />).toJSON();

  expect(tree).toMatchSnapshot();
});
