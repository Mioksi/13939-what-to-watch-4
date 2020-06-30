import React from 'react';
import renderer from 'react-test-renderer';

import App from './app.jsx';
import {Movie, MOVIES} from '../../common/consts';

const film = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  runTime: `1h 39m`,
  year: 2014,
  backgroundPoster: `img/bg-the-grand-budapest-hotel.jpg`,
  filmPoster: `img/the-grand-budapest-hotel-poster.jpg`,
  rating: 8.9,
  ratingCount: 240,
  description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege. Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
  director: `Wes Andreson`,
  starring: `Bill Murray, Edward Norton, Jude Law, Willem Dafoe and other`
};

const reviews = [
  {
    id: 1,
    author: `Kate Muir`,
    date: `December 24, 2016`,
    rating: 8.9,
    text: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years`,
  },
  {
    id: 2,
    author: `Bill Goodykoontz`,
    date: `November 18, 2015`,
    rating: 8.0,
    text: `Anderson's films are too precious for some, but for those of us willing to lose ourselves in them, they're a delight. "The Grand Budapest Hotel" is no different, except that he has added a hint of gravitas to the mix, improving the recipe.`,
  },
];

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      movieTitle={Movie.TITLE}
      movieGenre={Movie.GENRE}
      movieYear={Movie.YEAR}
      movies={MOVIES}
      film={film}
      reviews={reviews}
    />, {
      createNodeMock: () => {
        return {};
      }
    }).toJSON();

  expect(tree).toMatchSnapshot();
});
