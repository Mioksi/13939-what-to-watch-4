import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {AddMyList} from './add-my-list';

import {AUTHORIZATION_STATUS, FILM_ID} from '../../common/mock-test-data'
import {noop} from '../../common/utils'

it(`AddMyList component render correctly`, () => {
  const tree = renderer.create(
      <AddMyList
        id={FILM_ID}
        isFavorite={true}
        authorizationStatus={AUTHORIZATION_STATUS}
        onFavoriteButtonClick={noop}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
