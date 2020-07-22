import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import reducer from './reducer/reducer';
import {Operation as DataOperation} from './reducer/data/data';
import {createAPI} from './api';

import App from './components/app/app.jsx';

const api = createAPI(() => {});

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(DataOperation.loadFilms());
store.dispatch(DataOperation.loadPromoFilm());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
