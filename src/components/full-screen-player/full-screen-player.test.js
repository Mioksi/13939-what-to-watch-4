import React from 'react';
import renderer from 'react-test-renderer';

import FullScreenPlayer from './full-screen-player.jsx';

const mock = {
  isPlaying: false,
  name: `The Grand Budapest Hotel`,
  progress: 0,
  duration: 0,
};

const name = `The Grand Budapest Hotel`;

it(`Should FullScreenPlayer render correctly`, () => {
  const {isPlaying, progress, duration} = mock;

  const tree = renderer
    .create(
        <FullScreenPlayer
          isPlaying={isPlaying}
          progress={progress}
          duration={duration}
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
