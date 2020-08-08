import {Film} from '../../common/types';

export interface IWithFullScreenPlayerState {
  isPlaying: boolean
  duration: number
  progress: number
}

export interface IWithFullScreenPlayerProps {
  film: Film
}

interface IWithFullScreenPlayerAllProps {
  isPlaying: boolean
  duration: number
  progress: number
  elapsedTime: string
  onPlayButtonClick: () => void
  onFullScreenButtonClick: () => void
}

export type InjectedProps = IWithFullScreenPlayerProps & IWithFullScreenPlayerAllProps
