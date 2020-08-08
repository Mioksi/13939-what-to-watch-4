import {Film, Films} from '../../common/types';

interface IMoviePageProps {
  activeTab: string,
  renderTabs: () => void
}

export interface IStateToMoviePageProps {
  film: Film
  movies: Films
  isLoadingFavoriteFilm: boolean
}

export interface IDispatchToMoviePageProps {
  setActiveFilm: (film: Film) => void
  loadFilms: () => void
}

export type MoviePageProps = IMoviePageProps & IStateToMoviePageProps & IDispatchToMoviePageProps
