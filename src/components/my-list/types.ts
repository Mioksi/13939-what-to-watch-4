import {Films} from '../../common/types';

export interface IStateToMyListProps {
  films: Films
}

export interface IDispatchToMyListProps {
  loadFavoriteFilms: () => void
}

export type MyListProps = IStateToMyListProps & IDispatchToMyListProps
