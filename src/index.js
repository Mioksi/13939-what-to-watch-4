import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app.jsx';
import {Movie} from './common/consts';
import {movies} from './mocks/films';

ReactDOM.render(
    <App
      movieTitle={Movie.TITLE}
      movieGenre={Movie.GENRE}
      movieYear={Movie.YEAR}
      movies={movies}
    />,
    document.querySelector(`#root`)
);
