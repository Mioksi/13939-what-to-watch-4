import React from 'react';
import renderer from 'react-test-renderer';

import Tabs from './tabs.jsx';

const activeTab = `Overview`;

it(`Should Tabs render correctly`, () => {
  const tree = renderer
    .create(<Tabs
      activeTab={activeTab}
      onTabClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
