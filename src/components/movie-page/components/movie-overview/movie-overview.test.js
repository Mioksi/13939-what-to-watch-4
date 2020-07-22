import React from 'react';
import renderer from 'react-test-renderer';

import MovieOverview from './movie-overview.jsx';

const film = {
  rating: 8.9,
  ratingCount: 240,
  description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege. Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
  director: `Wes Andreson`,
  starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`]
};

it(`Should MovieOverview render correctly`, () => {
  const {description, director, rating, ratingCount, starring} = film;

  const tree = renderer
    .create(<MovieOverview
      description={description}
      director={director}
      rating={rating}
      ratingCount={ratingCount}
      starring={starring}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
