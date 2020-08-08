import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import FullScreenPlayer from './full-screen-player';

import {noop} from '../../common/utils';

configure({
  adapter: new Adapter(),
});

const mock = {
  isPlaying: false,
  progress: 0,
  duration: 0,
  elapsedTime: `00:00:00`
};

const name = `The Grand Budapest Hotel`;

it(`Click by Play button calls callback`, () => {
  const {isPlaying, progress, duration, elapsedTime} = mock;

  const handlePlayButtonClick = jest.fn();

  const wrapper = shallow(
      <FullScreenPlayer
        isPlaying={isPlaying}
        progress={progress}
        duration={duration}
        elapsedTime={elapsedTime}
        name={name}
        onFullScreenButtonClick={noop}
        onPlayButtonClick={handlePlayButtonClick}>
        <video />
      </FullScreenPlayer>
  );

  wrapper.find(`.player__play`).simulate(`click`);
  expect(handlePlayButtonClick).toHaveBeenCalledTimes(1);
});
