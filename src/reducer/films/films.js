import {extend} from '../../common/utils';

import {ActionCreator as ActionCreatorState} from "../state/state";

import history from '../../history';
import {AppRoute} from '../../common/consts';

const initialState = {
  films: [],
  promoFilm: {},
  reviews: []
};

const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`,
  LOAD_FILM_COMMENTS: `LOAD_COMMENTS`
};

const ActionCreator = {
  loadFilms: (films) => {
    return {
      type: ActionType.LOAD_FILMS,
      payload: films
    };
  },
  loadPromoFilm: (promoFilm) => {
    return {
      type: ActionType.LOAD_PROMO_FILM,
      payload: promoFilm
    };
  },
  loadFilmComments: (comments) => {
    return {
      type: ActionType.LOAD_FILM_COMMENTS,
      payload: comments
    };
  }
};

const Operation = {
  loadFilms: () => (dispatch, getState, api) => {
    dispatch(ActionCreatorState.loadingFilms(true));
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadFilms(response.data));
        dispatch(ActionCreatorState.loadingFilms(false));
      })
      .catch((err) => {
        throw err;
      });
  },

  loadPromoFilm: () => (dispatch, getState, api) => {
    dispatch(ActionCreatorState.loadingPromoFilm(true));
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.loadPromoFilm(response.data));
        dispatch(ActionCreatorState.loadingPromoFilm(false));
      })
      .catch((err) => {
        throw err;
      });
  },

  loadFilmComments: (id) => (dispatch, getState, api) => {
    dispatch(ActionCreatorState.loadingComments(true));
    return api.get(`/comments/${id}`)
      .then((response) => {
        dispatch(ActionCreator.loadFilmComments(response.data));
        dispatch(ActionCreatorState.loadingComments(true));
      })
      .catch((err) => {
        throw err;
      });
  },

  postComment: (id, comment) => (dispatch, getState, api) => {
    dispatch(ActionCreatorState.setFormDisabled(true));
    return api.post(`/comments/${id}`, {
      rating: comment.rating,
      comment: comment.comment
    })
      .then(() => {
        dispatch(ActionCreatorState.setFormDisabled(false));
        dispatch(ActionCreatorState.getErrorStatus(false));
        history.push(`${AppRoute.FILM}/${id}`);
      })
      .catch((err) => {
        dispatch(ActionCreatorState.setFormDisabled(false));
        dispatch(ActionCreatorState.getErrorStatus(true));

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
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
