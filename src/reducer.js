import {extend} from './common/utils';
import {movies} from './mocks/films';
import film from './mocks/film';
import reviews from './mocks/reviews';
import {ALL_GENRES} from './common/consts';

const initialState = {
  genre: ALL_GENRES,
  movies,
  film,
  reviews,
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  GET_MOVIES_BY_GENRE: `GET_MOVIES_BY_GENRE`,
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
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return extend(state, {
        activeGenre: action.payload
      });
    case ActionType.GET_MOVIES_BY_GENRE:
      return extend(state, {
        movies: action.payload
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
