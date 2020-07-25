import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

import {App} from './app.jsx';

import NameSpace from '../../reducer/name-space';
import {ALL_GENRES, AuthorizationStatus} from '../../common/consts';

const mockStore = configureStore([]);

const films = [
  {
    id: 1,
    name: `The Grand Budapest Hotel`,
    genre: `Drama`,
    [`run_time`]: `1h 39m`,
    released: 2014,
    [`preview_image`]: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    [`background_image`]: `img/bg-the-grand-budapest-hotel.jpg`,
    [`poster_image`]: `img/the-grand-budapest-hotel-poster.jpg`,
    [`video_link`]: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    [`preview_video_link`]: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    rating: 8.9,
    [`scores_count`]: 240,
    description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege. Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
    director: `Wes Andreson`,
    starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    [`is_favorite`]: false
  }
];

const film = {
  id: 1,
  name: `The Grand Budapest Hotel`,
  genre: `Drama`,
  [`run_time`]: `1h 39m`,
  released: 2014,
  [`preview_image`]: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  [`background_image`]: `img/bg-the-grand-budapest-hotel.jpg`,
  [`poster_image`]: `img/the-grand-budapest-hotel-poster.jpg`,
  [`video_link`]: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  [`preview_video_link`]: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  rating: 8.9,
  [`scores_count`]: 240,
  description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege. Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
  director: `Wes Andreson`,
  starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
  [`is_favorite`]: false
};

it(`Render App`, () => {
  const store = mockStore({
    [NameSpace.FILMS]: {
      films,
      promoFilm: film
    },
    [NameSpace.STATE]: {
      genre: ALL_GENRES,
      shownMoviesCount: 8,
      isPlayerActive: false
    },
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.NO_AUTH
    }
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <App
            login={() => {}}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
