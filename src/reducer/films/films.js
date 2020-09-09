import {extend} from '../../common/utils';

const initialState = {
  films: [],
  promoFilm: {},
  reviews: [],
  favoriteFilms: [],
  isLoadingFavoriteFilm: false,
  isFormDisabled: false,
  isLoadingFilms: true,
  isLoadingPromoFilm: true,
  isLoadingComments: false,
  isErrorLoading: false,
};

const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`,
  LOAD_FILM_COMMENTS: `LOAD_COMMENTS`,
  LOAD_FAVORITE_FILMS: `LOAD_FAVORITE_FILMS`,
  LOADING_FAVORITE_FILM: `LOADING_FAVORITE_FILM`,
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
  loadFavoriteFilms: (films) => ({
    type: ActionType.LOAD_FAVORITE_FILMS,
    payload: films
  }),
  loadingFavoriteFilm: (bool) => ({
    type: ActionType.LOADING_FAVORITE_FILM,
    payload: bool
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
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadFilms(response.data));
        dispatch(ActionCreator.loadingFilms(false));
        dispatch(ActionCreator.getErrorStatus(false));
      })
      .catch((err) => {
        dispatch(ActionCreator.loadingFilms(false));
        dispatch(ActionCreator.getErrorStatus(true));

        throw err;
      });
  },

  loadPromoFilm: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.loadPromoFilm(response.data));
        dispatch(ActionCreator.loadingPromoFilm(false));
        dispatch(ActionCreator.getErrorStatus(false));
      })
      .catch((err) => {
        dispatch(ActionCreator.loadingPromoFilm(false));
        dispatch(ActionCreator.getErrorStatus(true));

        throw err;
      });
  },

  loadFilmComments: (id) => (dispatch, getState, api) => {
    dispatch(ActionCreator.loadingComments(true));
    return api.get(`/comments/${id}`)
      .then((response) => {
        dispatch(ActionCreator.loadFilmComments(response.data));
        dispatch(ActionCreator.loadingComments(false));
        dispatch(ActionCreator.getErrorStatus(false));
      })
      .catch((err) => {
        dispatch(ActionCreator.loadingComments(false));
        dispatch(ActionCreator.getErrorStatus(true));

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
      })
      .catch((err) => {
        dispatch(ActionCreator.setFormDisabled(false));
        dispatch(ActionCreator.getErrorStatus(true));

        throw err;
      });
  },

  loadFavoriteFilms: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        dispatch(ActionCreator.loadFavoriteFilms(response.data));
        dispatch(ActionCreator.getErrorStatus(false));
      })
      .catch((err) => {
        dispatch(ActionCreator.getErrorStatus(true));

        throw err;
      });
  },

  postFavoriteFilm: (id, isFavorite) => (dispatch, getState, api) => {
    const status = isFavorite ? 1 : 0;
    dispatch(ActionCreator.loadingFavoriteFilm(true));

    return api.post(`/favorite/${id}/${status}`)
      .then(() => {
        dispatch(ActionCreator.getErrorStatus(false));
        dispatch(ActionCreator.loadingFavoriteFilm(false));
      })
      .catch((err) => {
        dispatch(ActionCreator.getErrorStatus(true));
        dispatch(ActionCreator.loadingFavoriteFilm(false));

        throw err;
      });
  },
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
    case ActionType.LOAD_FAVORITE_FILMS:
      return extend(state, {
        favoriteFilms: action.payload,
      });
    case ActionType.LOADING_FAVORITE_FILM:
      return extend(state, {
        isLoadingFavoriteFilm: action.payload,
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
