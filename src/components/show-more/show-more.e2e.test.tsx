import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import ShowMore from './show-more';

configure({
  adapter: new Adapter(),
});

it(`Should button be pressed`, () => {
  const onShowMoreClick = jest.fn();

  const showMore = shallow(
      <ShowMore
        onShowMoreButtonClick={onShowMoreClick}
      />
  );

  const button = showMore.find(`.catalog__button`);

  button.simulate(`click`);

  expect(onShowMoreClick).toHaveBeenCalledTimes(1);
});
