import React from 'react';
import renderer from 'react-test-renderer';

import FullScreenPlayer from './full-screen-player.jsx';

const mock = {
  isPlaying: false,
  title: `The Grand Budapest Hotel`,
  progress: 0,
  duration: 0,
};

it(`Should FullScreenPlayer render correctly`, () => {
  const {isPlaying, title, progress, duration} = mock;

  const tree = renderer
    .create(
        <FullScreenPlayer
          isPlaying={isPlaying}
          progress={progress}
          duration={duration}
          title={title}
          onFullScreenButtonClick={() => {}}
          onFullscreenToggle={() => {}}
          onPlayButtonClick={() => {}}
        >
          <video/>
        </FullScreenPlayer>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
