import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import {AddMyList} from './add-my-list';

configure({
  adapter: new Adapter(),
});

const settings = {
  id: 1,
  authStatus: `AUTH`
};

it(`Should button be pressed`, () => {
  const onMyListButtonClick = jest.fn();

  const addMyList = shallow(
      <AddMyList
        id={settings.id}
        isFavorite={true}
        authorizationStatus={settings.authStatus}
        onFavoriteButtonClick={onMyListButtonClick}
      />
  );

  const button = addMyList.find(`.movie-card__button`);

  button.simulate(`click`);

  expect(onMyListButtonClick).toHaveBeenCalledTimes(1);
});
