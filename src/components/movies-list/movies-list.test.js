import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';

import {MoviesList} from './movies-list.jsx';
import NameSpace from '../../reducer/name-space';

const mockStore = configureStore([]);

const films = [
  {
    id: 1,
    title: `The Grand Budapest Hotel`,
    genre: `Drama`,
    runTime: `1h 39m`,
    year: 2014,
    image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    backgroundPoster: `img/bg-the-grand-budapest-hotel.jpg`,
    filmPoster: `img/the-grand-budapest-hotel-poster.jpg`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    rating: 8.9,
    ratingCount: 240,
    description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege. Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
    director: `Wes Andreson`,
    starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`]
  }
];

it(`Should MoviesList render correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      films
    }
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <MoviesList
            movies={films}
            shownMoviesCount={8}
            onCardMouseEnter={() => {}}
            onCardMouseLeave={() => {}}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
