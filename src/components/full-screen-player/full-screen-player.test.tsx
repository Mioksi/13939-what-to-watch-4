import * as React from 'react';
import * as renderer from 'react-test-renderer';

import FullScreenPlayer from './full-screen-player';

import {noop} from '../../common/utils';

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
          onFullScreenButtonClick={noop}
          onPlayButtonClick={noop}
        >
          <video/>
        </FullScreenPlayer>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
