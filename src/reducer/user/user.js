import history from '../../history';

import {AuthorizationStatus} from '../../common/consts';

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  isErrorAuth: false
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  CHECK_ERROR_AUTHORIZATION: `CHECK_ERROR_AUTHORIZATION`
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },
  checkErrorAuthorization: (error) => {
    return {
      type: ActionType.CHECK_ERROR_AUTHORIZATION,
      payload: error,
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        authorizationStatus: action.payload,
      });
    case ActionType.CHECK_ERROR_AUTHORIZATION:
      return Object.assign({}, state, {
        isErrorAuth: action.payload,
      });
  }

  return state;
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then(() => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      })
      .catch((err) => {
        throw err;
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
      .then(() => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.checkErrorAuthorization(false));
        history.goBack();
      })
      .catch((err) => {
        dispatch(ActionCreator.checkErrorAuthorization(true));
        throw err;
      });
  },
};

export {reducer, ActionCreator, ActionType, Operation};
