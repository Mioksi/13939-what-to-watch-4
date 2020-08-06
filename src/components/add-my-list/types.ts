export interface IAddMyListProps {
  id: number,
  isFavorite: boolean,
}

export interface IStateToAddMyListProps {
  authorizationStatus: string
}

export interface IDispatchToAddMyListProps {
  onFavoriteButtonClick: (id: number, isFavorite: boolean) => void
}

export type AddMyListProps = IAddMyListProps & IStateToAddMyListProps & IDispatchToAddMyListProps
