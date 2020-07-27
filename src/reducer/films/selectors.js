import NameSpace from '../name-space';
import {getGenresList} from '../../common/utils';

export const getFilms = (state) => state[NameSpace.FILMS].films;

export const getPromoFilm = (state) => state[NameSpace.FILMS].promoFilm;

export const getComments = (state) => state[NameSpace.FILMS].reviews;

export const getAllGenres = (state) => getGenresList(state[NameSpace.FILMS].films);
