import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';

import history from '../../history';

import MovieCard from './movie-card.jsx';

const film = {
  id: 1,
  name: `Fantastic Beasts: The Crimes of Grindelwald`,
  [`preview_image`]: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  [`preview_video_link`]: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

it(`Should MovieCard render correctly`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <MovieCard
            movie={film}
            isPlaying={false}
            onCardClick={() => {}}
            onCardMouseEnter={() => {}}
            onCardMouseLeave={() => {}}
            onStartPlaying={() => {}}
            onStopPlaying={() => {}}
          />
        </Router>, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
