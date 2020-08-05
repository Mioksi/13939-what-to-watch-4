import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';

import history from '../../history';

import {Header} from './header.jsx';

import {AuthorizationStatus} from '../../common/consts';

it(`Header component render correctly`, () => {
  const tree = renderer.create(
      <Router
        history={history}
      >
        <Header
          authorizationStatus={AuthorizationStatus.NO_AUTH}
        />
      </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
