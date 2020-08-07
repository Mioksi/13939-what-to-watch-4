import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {GenresList} from './genres-list';

import {noop} from '../../common/utils';

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
      onGenreClick={noop}
    />).toJSON();

  expect(tree).toMatchSnapshot();
});
