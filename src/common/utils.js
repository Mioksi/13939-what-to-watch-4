import {ALL_GENRES} from './consts';

export const extend = (a, b) => Object.assign({}, a, b);

export const getGenresList = (films) => [ALL_GENRES, ...new Set(films.map((film) => film.genre))];

export const getFilteredFilms = (films, genre) => films.filter((film) => film.genre === genre);

export const noop = () => {};
