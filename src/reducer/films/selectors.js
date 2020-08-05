import NameSpace from '../name-space';
import {getGenresList} from '../../common/utils';

export const getFilms = (state) => state[NameSpace.FILMS].films;

export const getPromoFilm = (state) => state[NameSpace.FILMS].promoFilm;

export const getComments = (state) => state[NameSpace.FILMS].reviews;

export const getAllGenres = (state) => getGenresList(state[NameSpace.FILMS].films);

export const getFormState = (state) => state[NameSpace.FILMS].isFormDisabled;

export const getLoadingFilmsState = (state) => state[NameSpace.FILMS].isLoadingFilms;

export const getLoadingPromoFilmState = (state) => state[NameSpace.FILMS].isLoadingPromoFilm;

export const getLoadingCommentsState = (state) => state[NameSpace.FILMS].isLoadingComments;

export const getErrorStatus = (state) => state[NameSpace.FILMS].isErrorLoading;
