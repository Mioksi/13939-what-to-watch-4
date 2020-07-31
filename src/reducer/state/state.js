import {extend} from '../../common/utils';
import {ALL_GENRES, MAX_MOVIES} from '../../common/consts';

const initialState = {
  genre: ALL_GENRES,
  shownMoviesCount: MAX_MOVIES,
  activeFilm: null,
  isFormDisabled: false,
  isLoadingFilms: false,
  isLoadingPromoFilm: false,
  isLoadingComments: false
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  SHOW_MORE_MOVIES: `SHOW_MORE_MOVIES`,
  RESET_SHOWN_MOVIES: `RESET_SHOWN_MOVIES`,
  GET_ACTIVE_FILM_ID: `GET_ACTIVE_FILM_ID`,
  SET_FORM_DISABLED: `SET_FORM_DISABLED`,
  LOADING_FILMS: `LOADING_FILMS`,
  LOADING_PROMO_FILM: `SET_FORM_DISABLED`,
  LOADING_COMMENTS: `SET_FORM_DISABLED`
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
  getActiveFilmId: (id) => ({
    type: ActionType.GET_ACTIVE_FILM_ID,
    payload: id
  }),
  setFormDisabled: (bool) => ({
    type: ActionType.SET_FORM_DISABLED,
    payload: bool
  }),
  loadingFilms: (bool) => ({
    type: ActionType.LOADING_FILMS,
    payload: bool
  }),
  loadingPromoFilm: (bool) => ({
    type: ActionType.LOADING_PROMO_FILM,
    payload: bool
  }),
  loadingComments: (bool) => ({
    type: ActionType.LOADING_COMMENTS,
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
    case ActionType.GET_ACTIVE_FILM_ID:
      return extend(state, {
        activeFilmId: action.payload
      });
    case ActionType.SET_FORM_DISABLED:
      return extend(state, {
        isFormDisabled: action.payload
      });
    case ActionType.LOADING_FILMS:
      return extend(state, {
        isLoadingFilms: action.payload
      });
    case ActionType.LOADING_PROMO_FILM:
      return extend(state, {
        isLoadingPromoFilm: action.payload
      });
    case ActionType.LOADING_COMMENTS:
      return extend(state, {
        isLoadingComments: action.payload
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
