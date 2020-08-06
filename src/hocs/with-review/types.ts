import * as React from 'react';

import {Film} from '../../common/types';

export interface IWithReviewState {
  rating: number
  comment: string
}

export interface IWithReviewProps {
  film: Film
}

export interface InjectedProps {
  rating: number
  onRatingChange: (evt: React.ChangeEvent<HTMLInputElement>) => void
  onCommentChange: (evt:  React.ChangeEvent<HTMLTextAreaElement>) => void
  onSubmit: (evt:  React.FormEvent<HTMLFormElement>) => void
}

export interface IDispatchToWithReviewProps {
  onSubmit: (review: object, id: number) => void;
}
