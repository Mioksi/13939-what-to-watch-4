import React from 'react';
import renderer from 'react-test-renderer';

import Main from './main.jsx';
import {Movie, MOVIES} from '../../common/consts';

const mock = {
  activeGenre: `All genres`,
  genres: [`Family`, `Comedian`, `Drama`],
};

it(`Should Main render correctly`, () => {
  const {activeGenre, genres} = mock;

  const tree = renderer
    .create(<Main
      movieTitle={Movie.TITLE}
      movieGenre={Movie.GENRE}
      movieYear={Movie.YEAR}
      movies={MOVIES}
      activeGenre={activeGenre}
      allGenres={genres}
      shownMoviesCount={8}
      onGenreClick={() => {}}
      onCardClick={() => {}}
      onCardTitleClick={() => {}}
      onShowMoreButtonClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
