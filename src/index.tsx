import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import reducer from './reducer/reducer';
import {Operation as FilmsOperation} from './reducer/films/films';
import {Operation as UserOperation, ActionCreator} from './reducer/user/user';
import {createAPI} from './api';

import {AuthorizationStatus} from './common/consts';

import App from './components/app/app';

const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(FilmsOperation.loadFilms());
store.dispatch(FilmsOperation.loadPromoFilm());
store.dispatch(UserOperation.checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
