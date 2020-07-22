import React from 'react';
import renderer from 'react-test-renderer';

import {MovieCard} from './movie-card.jsx';

const movie = {
  id: 1,
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

it(`Should MovieCard render correctly`, () => {
  const tree = renderer
    .create(<MovieCard
      movie={movie}
      isPlaying={false}
      onCardClick={() => {}}
      onCardMouseEnter={() => {}}
      onCardMouseLeave={() => {}}
      onStartPlaying={() => {}}
      onStopPlaying={() => {}}
    />, {
      createNodeMock: () => {
        return {};
      }
    }).toJSON();

  expect(tree).toMatchSnapshot();
});
