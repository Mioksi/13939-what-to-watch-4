import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {MovieCard} from './movie-card.jsx';

const movie = {
  id: 1,
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should movie card click`, () => {
  const onCardClick = jest.fn();

  const movieCard = shallow(
      <MovieCard
        movie={movie}
        isPlaying={false}
        onCardClick={onCardClick}
        onCardMouseEnter={() => {}}
        onCardMouseLeave={() => {}}
        onStartPlaying={() => {}}
        onStopPlaying={() => {}}
      />
  );

  const movieTitle = movieCard.find(`.small-movie-card`);
  movieTitle.simulate(`click`);

  expect(onCardClick).toHaveBeenCalledTimes(1);
  expect(onCardClick).toHaveBeenCalledWith(movie.id);
});

it(`Should movie card be hover`, () => {
  const onCardMouseEnter = jest.fn();
  const onCardMouseLeave = jest.fn();

  const movieCard = shallow(
      <MovieCard
        movie={movie}
        isPlaying={false}
        onCardClick={() => {}}
        onCardMouseEnter={onCardMouseEnter}
        onCardMouseLeave={onCardMouseLeave}
        onStartPlaying={() => {}}
        onStopPlaying={() => {}}
      />
  );

  const card = movieCard.find(`.small-movie-card`);

  card.simulate(`mouseenter`);
  card.simulate(`mouseleave`);

  expect(onCardMouseEnter).toHaveBeenCalledTimes(1);
  expect(onCardMouseEnter).toHaveBeenCalledWith(movie.id);

  expect(onCardMouseLeave).toHaveBeenCalledTimes(1);
});
