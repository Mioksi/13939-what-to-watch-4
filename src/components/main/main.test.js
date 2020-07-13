import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

import {Main} from './main.jsx';
import {MOVIES} from '../../common/consts';

const mockStore = configureStore([]);

const film = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014,
  backgroundPoster: `img/bg-the-grand-budapest-hotel.jpg`,
  src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
};

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
            film={film}
            movies={MOVIES}
            shownMoviesCount={8}
            isPlayerActive={false}
            setFullscreenPlayer={() => {}}
            onCardClick={() => {}}
            onCardTitleClick={() => {}}
            onShowMoreButtonClick={() => {}}
          />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
