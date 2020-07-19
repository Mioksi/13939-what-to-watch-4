import {createSelector} from 'reselect';

import {getFilms} from '../data/selectors';

import NameSpace from '../name-space';
import {ALL_GENRES} from '../../common/consts';
import {getFilteredFilms} from '../../common/utils';

export const getCurrentGenre = (state) => state[NameSpace.STATE].genre;

export const getShownMovies = (state) => state[NameSpace.STATE].shownMoviesCount;

export const getPlayerState = (state) => state[NameSpace.STATE].isPlayerActive;

export const getFilmsByGenre = createSelector(
    getFilms,
    getCurrentGenre,
    (films, genre) => {
      return (genre === ALL_GENRES) ? films : getFilteredFilms(films, genre);
    }
);
