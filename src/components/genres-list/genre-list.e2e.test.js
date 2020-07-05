import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import GenresList from './genres-list.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const mock = {
  activeGenre: `All genres`,
  genres: [`Family`, `Comedian`, `Drama`],
};

it(`Should genre be pressed`, () => {
  const {activeGenre, genres} = mock;

  const onGenreClick = jest.fn();

  const mockEvent = {
    preventDefault() {}
  };

  const tabs = shallow(
      <GenresList
        allGenres={genres}
        activeGenre={activeGenre}
        onGenreClick={onGenreClick}
      />
  );

  const genreLinks = tabs.find(`.catalog__genres-link`);

  genreLinks.forEach((tabLink) => tabLink.simulate(`click`, mockEvent));

  expect(onGenreClick).toHaveBeenCalledTimes(genreLinks.length);
  expect(onGenreClick).toHaveBeenNthCalledWith(1, `Family`);
  expect(onGenreClick).toHaveBeenNthCalledWith(2, `Comedian`);
  expect(onGenreClick).toHaveBeenNthCalledWith(3, `Drama`);
});
