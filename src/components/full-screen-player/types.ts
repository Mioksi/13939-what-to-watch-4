import * as React from 'react';

export interface IFullScreenPlayerProps {
  isPlaying: boolean
  progress: number
  duration: number
  onPlayButtonClick: () => void
  onFullScreenButtonClick: () => void
  children: React.ReactElement
  name: string
  elapsedTime: string
}
