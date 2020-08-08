import * as React from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/state/state';

import {getAllGenres} from '../../reducer/films/selectors';
import {getCurrentGenre} from '../../reducer/state/selectors';

import {MAX_GENRES} from '../../common/consts';
import {GenresListProps, IDispatchToGenresListProps, IStateToGenresListProps} from './types';

const setActiveClass = (activeGenre: string, genre: string): string => {
  return activeGenre === genre ? `catalog__genres-item--active` : ``;
};

const getGenre = (
    genre: string,
    i: number,
    activeGenre: string,
    onGenreClick: (genre: string) => void): React.ReactElement => {

  const genreClass = `catalog__genres-item ${setActiveClass(activeGenre, genre)}`;
  const key = `${genre} + ${i}`;

  const handleGenreClick = () => {
    return (evt: React.MouseEvent): void => {
      evt.preventDefault();
      onGenreClick(genre);
    };
  };

  return (
    <li
      className={genreClass}
      key={key}
    >
      <a onClick={handleGenreClick()} href="#" className="catalog__genres-link">{genre}</a>
    </li>
  );
};

const GenresList: React.FC<GenresListProps> = ({allGenres, activeGenre, onGenreClick}: GenresListProps) => {
  const renderGenres = (): React.ReactNodeArray => {
    return allGenres.slice(0, MAX_GENRES).map((genre, i) => getGenre(genre, i, activeGenre, onGenreClick));
  };

  return (
    <ul className="catalog__genres-list">
      {renderGenres()}
    </ul>
  );
};

const mapStateToProps = (state): IStateToGenresListProps => ({
  activeGenre: getCurrentGenre(state),
  allGenres: getAllGenres(state),
});

const mapDispatchToProps = (dispatch): IDispatchToGenresListProps => ({
  onGenreClick: (genre: string) => {
    dispatch(ActionCreator.changeGenre(genre));
    dispatch(ActionCreator.resetShownMovies());
  }
});

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
