import {extend} from '../../common/utils';

import {ActionCreator as ActionCreatorState} from "../state/state";

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
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadFilms(response.data));
      });
  },

  loadPromoFilm: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.loadPromoFilm(response.data));
      });
  },

  loadFilmComments: (filmId) => (dispatch, getState, api) => {
    return api.get(`/comments/${filmId}`)
      .then((response) => {
        dispatch(ActionCreator.loadFilmComments(response.data));
      });
  },

  postComment: (id, comment) => (dispatch, getState, api) => {
    return api.post(`/comments/${id}`, {
      rating: comment.rating,
      comment: comment.comment
    })
      .then(() => {
        dispatch(ActionCreatorState.setFormDisabled(false));
      })
      .catch((err) => {
        dispatch(ActionCreatorState.setFormDisabled(false));

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
