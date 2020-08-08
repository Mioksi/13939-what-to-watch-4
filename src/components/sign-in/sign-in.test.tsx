import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';

import history from '../../history';

import {SignIn} from './sign-in';

import {noop} from '../../common/utils';

it(`AuthScreen component render correctly`, () => {
  const tree = renderer.create(
      <Router
        history={history}
      >
        <SignIn
          onSubmit={noop}
          isErrorAuth={true}
        />
      </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
