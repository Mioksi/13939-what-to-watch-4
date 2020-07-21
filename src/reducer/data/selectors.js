import NameSpace from '../name-space';
import {getGenresList} from '../../common/utils';

export const getFilms = (state) => state[NameSpace.DATA].films;

export const getPromoFilm = (state) => state[NameSpace.DATA].promoFilm;

export const getComments = (state) => state[NameSpace.DATA].reviews;

export const getAllGenres = (state) => getGenresList(state[NameSpace.DATA].films);
