import {extend, getGenresList} from './common/utils';
import {movies} from './mocks/films';
import film from './mocks/film';
import reviews from './mocks/reviews';
import {ALL_GENRES, MAX_MOVIES} from './common/consts';

const initialState = {
  genre: ALL_GENRES,
  movies,
  film,
  reviews,
  genresList: getGenresList(movies),
  shownMoviesCount: MAX_MOVIES,
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  GET_MOVIES_BY_GENRE: `GET_MOVIES_BY_GENRE`,
  SHOW_MORE_MOVIES: `SHOW_MORE_MOVIES`,
  RESET_SHOWN_MOVIES: `RESET_SHOWN_MOVIES`
};

const getFilteredMovies = (genre) => movies.filter((movie) => movie.genre === genre);

const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre,
  }),
  getMoviesByGenre: (genre) => {
    const moviesByGenre = (genre === ALL_GENRES) ? movies : getFilteredMovies(genre);

    return {
      type: ActionType.GET_MOVIES_BY_GENRE,
      payload: moviesByGenre
    };
  },
  showMoreMovies: () => ({
    type: ActionType.SHOW_MORE_MOVIES,
    payload: MAX_MOVIES
  }),
  resetShownMovies: () => ({
    type: ActionType.RESET_SHOWN_MOVIES,
    payload: null
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return extend(state, {
        genre: action.payload
      });
    case ActionType.GET_MOVIES_BY_GENRE:
      return extend(state, {
        movies: action.payload
      });
    case ActionType.SHOW_MORE_MOVIES:
      return extend(state, {
        shownMoviesCount: state.shownMoviesCount + action.payload,
      });
    case ActionType.RESET_SHOWN_MOVIES:
      return extend(state, {
        shownMoviesCount: MAX_MOVIES
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
