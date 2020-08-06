import {Films} from '../../common/types';

interface IMoviesListProps {
  movies: Films
  onCardMouseEnter: () => void
  onCardMouseLeave: () => void
}

export interface IStateToMoviesListProps {
  shownMoviesCount: number
}

export type MoviesListProps = IMoviesListProps & IStateToMoviesListProps
