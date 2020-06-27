import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Tabs from './tabs.jsx';
import {TabType} from '../../common/consts';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should tab be pressed`, () => {
  const onTabClick = jest.fn();

  const mockEvent = {
    preventDefault() {}
  };

  const tabs = shallow(
      <Tabs
        activeTab={TabType.OVERVIEW}
        onTabClick={onTabClick}
      />
  );

  const tabLinks = tabs.find(`.movie-nav__link`);

  tabLinks.forEach((tabLink) => tabLink.simulate(`click`, mockEvent));

  expect(onTabClick).toHaveBeenCalledTimes(tabLinks.length);
  expect(onTabClick).toHaveBeenNthCalledWith(1, TabType.OVERVIEW);
  expect(onTabClick).toHaveBeenNthCalledWith(2, TabType.DETAILS);
  expect(onTabClick).toHaveBeenNthCalledWith(3, TabType.REVIEWS);
});
