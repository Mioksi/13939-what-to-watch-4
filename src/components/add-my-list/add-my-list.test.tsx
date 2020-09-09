import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {AddMyList} from './add-my-list';

import {noop} from '../../common/utils';

const settings = {
  id: 1,
  authStatus: `AUTH`
};

it(`AddMyList component render correctly`, () => {
  const tree = renderer.create(
      <AddMyList
        id={settings.id}
        isFavorite={true}
        authorizationStatus={settings.authStatus}
        onFavoriteButtonClick={noop}
        history={{}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
