import {Film} from '../../common/types';

export interface IWithFullScreenPlayerState {
  isPlaying: boolean
  duration: number
  progress: number
}

export interface IWithFullScreenPlayerProps {
  film: Film
}

export interface InjectedProps {
  isPlaying: boolean;
  duration: number;
  progress: number;
  elapsedTime: string,
  film: Film
  onPlayButtonClick: () => void
  onFullScreenButtonClick: () => void
}
