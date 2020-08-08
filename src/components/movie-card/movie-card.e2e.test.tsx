import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import MovieCard from './movie-card';

import {film} from '../../common/test-data';
import {noop} from '../../common/utils';

configure({
  adapter: new Adapter(),
});

it(`Should movie card be hover`, () => {
  const onCardMouseEnter = jest.fn();
  const onCardMouseLeave = jest.fn();

  const movieCard = shallow(
      <MovieCard
        movie={film}
        isPlaying={false}
        onCardMouseEnter={onCardMouseEnter}
        onCardMouseLeave={onCardMouseLeave}
        onStartPlaying={noop}
        onStopPlaying={noop}
      />
  );

  const card = movieCard.find(`.small-movie-card`);

  card.simulate(`mouseenter`);
  card.simulate(`mouseleave`);

  expect(onCardMouseEnter).toHaveBeenCalledTimes(1);
  expect(onCardMouseEnter).toHaveBeenCalledWith(film.id);

  expect(onCardMouseLeave).toHaveBeenCalledTimes(1);
});
