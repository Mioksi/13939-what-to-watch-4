import React from 'react';
import renderer from 'react-test-renderer';

import FullScreenPlayer from './full-screen-player.jsx';

const mock = {
  isPlaying: false,
  name: `The Grand Budapest Hotel`,
  progress: 0,
  duration: 0,
  elapsedTime: `00:00:00`
};

const name = `The Grand Budapest Hotel`;

it(`Should FullScreenPlayer render correctly`, () => {
  const {isPlaying, progress, duration, elapsedTime} = mock;

  const tree = renderer
    .create(
        <FullScreenPlayer
          isPlaying={isPlaying}
          progress={progress}
          duration={duration}
          elapsedTime={elapsedTime}
          name={name}
          onFullScreenButtonClick={() => {}}
          onFullscreenToggle={() => {}}
          onPlayButtonClick={() => {}}
        >
          <video/>
        </FullScreenPlayer>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
