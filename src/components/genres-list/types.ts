export interface IStateToGenresListProps {
  activeGenre: string,
  allGenres: string[]
}

export interface IDispatchToGenresListProps {
  onGenreClick: (genre: string) => void
}

export type GenresListProps = IStateToGenresListProps & IDispatchToGenresListProps
