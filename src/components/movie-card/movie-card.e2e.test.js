import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MovieCard from './movie-card.jsx';

const movie = {
  id: 1,
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
};

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should card title be pressed`, () => {
  const onCardTitleClick = jest.fn();

  const mockEvent = {
    preventDefault() {}
  };

  const movieCard = shallow(
      <MovieCard
        movie={movie}
        onCardClick={() => {}}
        onCardTitleClick={onCardTitleClick}
        onCardMouseEnter={() => {}}
        onCardMouseLeave={() => {}}
      />
  );

  const movieTitle = movieCard.find(`.small-movie-card__link`);
  movieTitle.simulate(`click`, mockEvent);

  expect(onCardTitleClick).toHaveBeenCalledTimes(1);
});

it(`Should movie card click`, () => {
  const onCardClick = jest.fn();

  const movieCard = shallow(
      <MovieCard
        movie={movie}
        onCardClick={onCardClick}
        onCardTitleClick={() => {}}
        onCardMouseEnter={() => {}}
        onCardMouseLeave={() => {}}
      />
  );

  const movieTitle = movieCard.find(`.small-movie-card`);
  movieTitle.simulate(`click`);

  expect(onCardClick).toHaveBeenCalledTimes(1);
});

it(`Should movie card be hover`, () => {
  const onCardMouseEnter = jest.fn();
  const onCardMouseLeave = jest.fn();

  const movieCard = shallow(
      <MovieCard
        movie={movie}
        onCardClick={() => {}}
        onCardTitleClick={() => {}}
        onCardMouseEnter={onCardMouseEnter}
        onCardMouseLeave={onCardMouseLeave}
      />
  );

  const card = movieCard.find(`.small-movie-card`);

  card.simulate(`mouseenter`);
  card.simulate(`mouseleave`);

  expect(onCardMouseEnter).toHaveBeenCalledTimes(1);
  expect(onCardMouseEnter.mock.calls[0][0]).toBe(movie.id);

  expect(onCardMouseLeave).toHaveBeenCalledTimes(1);
});
