import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import {AddReview} from './add-review';

import {film} from '../../common/test-data';
import {noop} from '../../common/utils';

configure({
  adapter: new Adapter(),
});

const mockEvent = {
  preventDefault: noop
};

describe(`Form work correctly`, () => {
  it(`Should form be submitted`, () => {
    const onSubmit = jest.fn();

    const addReview = shallow(
        <AddReview
          film={film}
          isErrorLoading={false}
          isFormDisabled={false}
          rating={1}
          onRatingChange={noop}
          onCommentChange={noop}
          onSubmit={onSubmit}
        />
    );

    const form = addReview.find(`.add-review__form`);
    form.simulate(`submit`, mockEvent);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(mockEvent);
  });

  it(`Should rating be changed`, () => {
    const onRatingChange = jest.fn();

    const addReview = shallow(
        <AddReview
          film={film}
          isErrorLoading={false}
          isFormDisabled={false}
          rating={3}
          onRatingChange={onRatingChange}
          onCommentChange={noop}
          onSubmit={noop}
        />
    );

    const ratingStars = addReview.find(`.rating__input`);
    ratingStars.at(2).simulate(`change`, mockEvent);

    expect(onRatingChange).toHaveBeenCalledTimes(1);
    expect(onRatingChange).toHaveBeenCalledWith(mockEvent);
  });

  it(`Should comment be changed`, () => {
    const onCommentChange = jest.fn();

    const addReview = shallow(
        <AddReview
          film={film}
          isErrorLoading={false}
          isFormDisabled={false}
          rating={5}
          onRatingChange={noop}
          onCommentChange={onCommentChange}
          onSubmit={noop}
        />
    );

    const comment = addReview.find(`.add-review__textarea`);

    comment.simulate(`change`, mockEvent);

    expect(onCommentChange).toHaveBeenCalledTimes(1);
    expect(onCommentChange).toHaveBeenCalledWith(mockEvent);
  });
});
