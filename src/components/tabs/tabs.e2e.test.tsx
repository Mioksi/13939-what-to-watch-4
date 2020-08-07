import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import Tabs from './tabs';

import {TabType} from '../../common/consts';
import {noop} from '../../common/utils';

configure({
  adapter: new Adapter(),
});

const mockEvent = {
  preventDefault: noop
};

it(`Should tab be pressed`, () => {
  const onTabClick = jest.fn();

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
