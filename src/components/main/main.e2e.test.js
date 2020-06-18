import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Main from './main';
import {Movie, MOVIES} from '../../common/consts';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should card title be pressed`, () => {
  const onCardTitleClick = jest.fn();

  const main = shallow(
      <Main
        movieTitle={Movie.TITLE}
        movieGenre={Movie.GENRE}
        movieYear={Movie.YEAR}
        movies={MOVIES}
        onCardTitleClick={onCardTitleClick}
      />
  );

  const movieTitles = main.find(`small-movie-card__link`);

  movieTitles.forEach((title) => title.simulate(`click`));

  expect(onCardTitleClick).toHaveBeenCalledTimes(movieTitles.length);
});
