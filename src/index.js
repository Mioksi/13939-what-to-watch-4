import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app.jsx';
import {Movie} from './common/consts';

ReactDOM.render(
    <App
      movieTitle={Movie.TITLE}
      movieGenre={Movie.GENRE}
      movieYear={Movie.YEAR}
    />,
    document.querySelector(`#root`)
);
