import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

import {Main} from './main.jsx';
import {Movie, MOVIES} from '../../common/consts';

const mockStore = configureStore([]);

const mock = {
  activeGenre: `All genres`,
  genres: [`Family`, `Comedian`, `Drama`],
};

it(`Should Main render correctly`, () => {
  const {activeGenre, genres} = mock;

  const store = mockStore({
    genre: activeGenre,
    genresList: genres
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Main
            movieTitle={Movie.TITLE}
            movieGenre={Movie.GENRE}
            movieYear={Movie.YEAR}
            movies={MOVIES}
            shownMoviesCount={8}
            onCardClick={() => {}}
            onCardTitleClick={() => {}}
            onShowMoreButtonClick={() => {}}
          />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
