import React from 'react';
import renderer from 'react-test-renderer';

import MovieDetails from './movie-details.jsx';

const film = {
  genre: `Drama`,
  runTime: `1h 39m`,
  year: 2014,
  director: `Wes Andreson`,
  starring: `Bill Murray, Edward Norton, Jude Law, Willem Dafoe and other`
};

it(`Should MovieDetails render correctly`, () => {
  const {director, genre, runTime, starring, year} = film;

  const tree = renderer
    .create(<MovieDetails
      director={director}
      genre={genre}
      runTime={runTime}
      starring={starring}
      year={year}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
