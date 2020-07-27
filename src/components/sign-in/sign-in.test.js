import React from 'react';
import renderer from 'react-test-renderer';

import {SignIn} from './sign-in.jsx';

it(`AuthScreen component render correctly`, () => {
  const tree = renderer.create(
      <SignIn
        onSubmit={() => {}}
        isErrorAuth={true}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
