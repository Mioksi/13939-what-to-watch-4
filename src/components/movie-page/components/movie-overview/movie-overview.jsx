import React from 'react';
import PropTypes from 'prop-types';

import {getFormatRating, getTextRating} from '../../helpers/utils';

const MovieOverview = ({rating, ratingCount, description, director, starring}) => {
  return (
    <>
      <div className="movie-rating">
        <div className="movie-rating__score">{getFormatRating(rating)}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{getTextRating(rating)}</span>
          <span className="movie-rating__count">{ratingCount} ratings</span>
        </p>
      </div>
      <div className="movie-card__text">
        <p>{description}</p>
        <p className="movie-card__director"><strong>Director: {director}</strong></p>
        <p className="movie-card__starring"><strong>Starring: {starring.join(`, `)}</strong></p>
      </div>
    </>
  );
};

MovieOverview.propTypes = {
  rating: PropTypes.number.isRequired,
  ratingCount: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  director: PropTypes.string.isRequired,
  starring: PropTypes.arrayOf(
      PropTypes.string.isRequired
  ).isRequired,
};

export default MovieOverview;
