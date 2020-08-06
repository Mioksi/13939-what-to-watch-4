import {Film} from '../../common/types';

export interface IMovieCardProps {
  movie: Film,
  isPlaying: boolean
  onStopPlaying: () => void
  onCardMouseEnter: (id: number) => void
  onCardMouseLeave: () => void
  onStartPlaying: () => void
}
