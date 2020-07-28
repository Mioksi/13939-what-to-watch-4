import {extend} from '../../common/utils';
import {ALL_GENRES, MAX_MOVIES} from '../../common/consts';

const initialState = {
  genre: ALL_GENRES,
  shownMoviesCount: MAX_MOVIES,
  isPlayerActive: false,
  activeFilm: -1,
  isFormDisabled: false
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  SHOW_MORE_MOVIES: `SHOW_MORE_MOVIES`,
  RESET_SHOWN_MOVIES: `RESET_SHOWN_MOVIES`,
  SET_FULLSCREEN_PLAYER: `SET_FULLSCREEN_PLAYER`,
  GET_ACTIVE_FILM_ID: `GET_ACTIVE_FILM_ID`,
  SET_FORM_DISABLED: `SET_FORM_DISABLED`
};

const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre,
  }),
  showMoreMovies: () => ({
    type: ActionType.SHOW_MORE_MOVIES,
    payload: MAX_MOVIES
  }),
  resetShownMovies: () => ({
    type: ActionType.RESET_SHOWN_MOVIES,
    payload: null
  }),
  setFullscreenPlayer: (state) => ({
    type: ActionType.SET_FULLSCREEN_PLAYER,
    payload: state
  }),
  getActiveFilmId: (id) => ({
    type: ActionType.GET_ACTIVE_FILM_ID,
    payload: id
  }),
  setFormDisabled: (bool) => ({
    type: ActionType.SET_FORM_DISABLED,
    payload: bool
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return extend(state, {
        genre: action.payload
      });
    case ActionType.SHOW_MORE_MOVIES:
      return extend(state, {
        shownMoviesCount: state.shownMoviesCount + action.payload,
      });
    case ActionType.RESET_SHOWN_MOVIES:
      return extend(state, {
        shownMoviesCount: MAX_MOVIES
      });
    case ActionType.SET_FULLSCREEN_PLAYER:
      return extend(state, {
        isPlayerActive: action.payload
      });
    case ActionType.GET_ACTIVE_FILM_ID:
      return extend(state, {
        activeFilmId: action.payload
      });
    case ActionType.SET_FORM_DISABLED:
      return extend(state, {
        isFormDisabled: action.payload
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
