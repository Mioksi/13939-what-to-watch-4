import React from 'react';
import PropTypes from 'prop-types';

import {getFormatRating, getFormatDate, getFormatInnerDate} from '../../../helpers/utils';
import {dateOptions, dateInnerOptions} from '../../../../../common/consts';

const MovieReview = ({name, date, rating, comment}) => {
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

MovieReview.propTypes = {
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  comment: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default MovieReview;
