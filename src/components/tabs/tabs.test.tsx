import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Tabs from './tabs';

import {noop} from '../../common/utils';

const activeTab = `Overview`;

it(`Should Tabs render correctly`, () => {
  const tree = renderer
    .create(<Tabs
      activeTab={activeTab}
      onTabClick={noop}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
