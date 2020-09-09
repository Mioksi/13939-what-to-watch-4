import {Film, Films} from '../../common/types';

interface IMainToProps {
  history: any
}

export interface IStateToMainProps {
  film: Film
  films: Films
  shownMoviesCount: number
  isLoadingFavoriteFilm: boolean
}

export interface IDispatchToMainProps {
  onShowMoreButtonClick: () => void
  loadPromoFilm: () => void
}

export type MainProps = IMainToProps & IStateToMainProps & IDispatchToMainProps
