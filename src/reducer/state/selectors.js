import {createSelector} from 'reselect';

import {getFilms} from '../films/selectors';

import NameSpace from '../name-space';
import {ALL_GENRES, MAX_SIMILAR_MOVIES} from '../../common/consts';
import {getFilteredFilms} from '../../common/utils';

export const getActiveFilm = (state) => state[NameSpace.STATE].activeFilm;

export const getCurrentGenre = (state) => state[NameSpace.STATE].genre;

export const getShownMovies = (state) => state[NameSpace.STATE].shownMoviesCount;

export const getFormState = (state) => state[NameSpace.STATE].isFormDisabled;

export const getLoadingFilmsState = (state) => state[NameSpace.STATE].isLoadingFilms;

export const getLoadingPromoFilmState = (state) => state[NameSpace.STATE].isLoadingPromoFilm;

export const getLoadingCommentsState = (state) => state[NameSpace.STATE].isLoadingComments;

export const getSelectedFilm = (state, id) => {
  const films = getFilms(state);

  return films.find((film) => film.id === id && film);
};

export const getFilmsByGenre = createSelector(
    getFilms,
    getCurrentGenre,
    (films, genre) => {
      return (genre === ALL_GENRES) ? films : getFilteredFilms(films, genre);
    }
);

export const getSimilarFilms = createSelector(
    getFilmsByGenre,
    getActiveFilm,
    (filteredFilms, currentFilm) => {
      return (
        filteredFilms.filter(
            (film) => currentFilm && film.id !== currentFilm.id).slice(0, MAX_SIMILAR_MOVIES));
    }
);
