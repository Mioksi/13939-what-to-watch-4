export interface IWithVideoPlayerState {
  isPlaying: boolean;
}

export interface InjectingProps {
  isPlaying: boolean
  onStartPlaying: () => void
  onStopPlaying: () => void
}
