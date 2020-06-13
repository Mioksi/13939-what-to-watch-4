import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Main from './main';
import {Movie, MOVIE_TITLES} from '../../common/consts';

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
        cardTitles={MOVIE_TITLES}
        onCardTitleClick={onCardTitleClick}
      />
  );

  const movieTitles = main.find(`small-movie-card__link`);

  movieTitles.forEach((title) => title.props().onClick());

  expect(onCardTitleClick.mock.calls.length).toBe(movieTitles.length);
});
