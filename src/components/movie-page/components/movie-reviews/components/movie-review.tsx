import * as React from 'react';

import {getFormatRating, getFormatDate, getFormatInnerDate} from '../../../helpers/utils';
import {dateOptions, dateInnerOptions} from '../../../../../common/consts';
import {IMovieReviewProps} from './types';

const MovieReview: React.FC<IMovieReviewProps> = ({name, date, rating, comment}: IMovieReviewProps) => {
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>
        <footer className="review__details">
          <cite className="review__author">{name}</cite>
          <time className="review__date" dateTime={getFormatInnerDate(date, dateInnerOptions)}>
            {getFormatDate(date, dateOptions)}
          </time>
        </footer>
      </blockquote>
      <div className="review__rating">{getFormatRating(rating)}</div>
    </div>
  );
};

export default MovieReview;
