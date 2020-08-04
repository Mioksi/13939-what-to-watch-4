import {extend} from '../../common/utils';

import history from '../../history';
import {AppRoute} from '../../common/consts';

const initialState = {
  films: [],
  promoFilm: {},
  reviews: [],
  isFormDisabled: false,
  isLoadingFilms: false,
  isLoadingPromoFilm: false,
  isLoadingComments: false,
  isErrorLoading: false,
};

const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`,
  LOAD_FILM_COMMENTS: `LOAD_COMMENTS`,
  SET_FORM_DISABLED: `SET_FORM_DISABLED`,
  LOADING_FILMS: `LOADING_FILMS`,
  LOADING_PROMO_FILM: `LOADING_PROMO_FILM`,
  LOADING_COMMENTS: `LOADING_COMMENTS`,
  GET_ERROR_STATUS: `GET_ERROR_STATUS`
};

const ActionCreator = {
  loadFilms: (films) => ({
    type: ActionType.LOAD_FILMS,
    payload: films
  }),
  loadPromoFilm: (promoFilm) => ({
    type: ActionType.LOAD_PROMO_FILM,
    payload: promoFilm
  }),
  loadFilmComments: (comments) => ({
    type: ActionType.LOAD_FILM_COMMENTS,
    payload: comments
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
  }),
  getErrorStatus: (bool) => ({
    type: ActionType.GET_ERROR_STATUS,
    payload: bool
  })
};

const Operation = {
  loadFilms: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.loadingFilms(true));
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadFilms(response.data));
        dispatch(ActionCreator.loadingFilms(false));
      })
      .catch((err) => {
        dispatch(ActionCreator.loadingFilms(false));

        throw err;
      });
  },

  loadPromoFilm: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.loadingPromoFilm(true));
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.loadPromoFilm(response.data));
        dispatch(ActionCreator.loadingPromoFilm(false));
      })
      .catch((err) => {
        dispatch(ActionCreator.loadingPromoFilm(false));

        throw err;
      });
  },

  loadFilmComments: (id) => (dispatch, getState, api) => {
    dispatch(ActionCreator.loadingComments(true));
    return api.get(`/comments/${id}`)
      .then((response) => {
        dispatch(ActionCreator.loadFilmComments(response.data));
        dispatch(ActionCreator.loadingComments(false));
      })
      .catch((err) => {
        dispatch(ActionCreator.loadingComments(false));

        throw err;
      });
  },

  postComment: (id, comment) => (dispatch, getState, api) => {
    dispatch(ActionCreator.setFormDisabled(true));
    return api.post(`/comments/${id}`, {
      rating: comment.rating,
      comment: comment.comment
    })
      .then(() => {
        dispatch(ActionCreator.setFormDisabled(false));
        dispatch(ActionCreator.getErrorStatus(false));
        history.push(`${AppRoute.FILM}/${id}`);
      })
      .catch((err) => {
        dispatch(ActionCreator.setFormDisabled(false));
        dispatch(ActionCreator.getErrorStatus(true));

        throw err;
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_FILMS:
      return extend(state, {
        films: action.payload
      });
    case ActionType.LOAD_PROMO_FILM:
      return extend(state, {
        promoFilm: action.payload
      });
    case ActionType.LOAD_FILM_COMMENTS:
      return extend(state, {
        reviews: action.payload
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
    case ActionType.GET_ERROR_STATUS:
      return extend(state, {
        isErrorLoading: action.payload
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
