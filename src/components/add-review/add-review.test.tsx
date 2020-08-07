import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';

import history from '../../history';

import {AddReview} from './add-review';

import {noop} from '../../common/utils';
import {film} from '../../common/test-data';

it(`AddReview component render correctly`, () => {
  const tree = renderer.create(
      <Router
        history={history}
      >
        <AddReview
          film={film}
          onRatingChange={noop}
          onCommentChange={noop}
          onSubmit={noop}
          isErrorLoading={false}
          isFormDisabled={false}
          rating={1}
        />
      </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
