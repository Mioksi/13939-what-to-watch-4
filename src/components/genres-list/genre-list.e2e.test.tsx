import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import {GenresList} from './genres-list';

import {noop} from '../../common/utils';

configure({
  adapter: new Adapter(),
});

const mockEvent = {
  preventDefault: noop
};

const mock = {
  activeGenre: `All genres`,
  genres: [`Family`, `Comedian`, `Drama`],
};

it(`Should genre be pressed`, () => {
  const {activeGenre, genres} = mock;

  const onGenreClick = jest.fn();

  const genresList = shallow(
      <GenresList
        allGenres={genres}
        activeGenre={activeGenre}
        onGenreClick={onGenreClick}
      />
  );

  const genreLinks = genresList.find(`.catalog__genres-link`);

  genreLinks.forEach((tabLink) => tabLink.simulate(`click`, mockEvent));

  expect(onGenreClick).toHaveBeenCalledTimes(genreLinks.length);
  expect(onGenreClick).toHaveBeenNthCalledWith(1, `Family`);
  expect(onGenreClick).toHaveBeenNthCalledWith(2, `Comedian`);
  expect(onGenreClick).toHaveBeenNthCalledWith(3, `Drama`);
});
