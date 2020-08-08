import * as React from 'react';
import * as renderer from 'react-test-renderer';

import ShowMore from './show-more';

import {noop} from '../../common/utils';

it(`Should ShowMore render correctly`, () => {
  const tree = renderer
    .create(
        <ShowMore
          onShowMoreButtonClick={noop}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
