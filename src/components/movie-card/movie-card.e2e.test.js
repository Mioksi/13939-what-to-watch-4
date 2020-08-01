import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MovieCard from './movie-card.jsx';

const movie = {
  id: 1,
  name: `Fantastic Beasts: The Crimes of Grindelwald`,
  [`preview_image`]: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  [`preview_video_link`]: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should movie card be hover`, () => {
  const onCardMouseEnter = jest.fn();
  const onCardMouseLeave = jest.fn();

  const movieCard = shallow(
      <MovieCard
        movie={movie}
        isPlaying={false}
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
