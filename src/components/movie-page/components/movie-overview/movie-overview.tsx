import * as React from 'react';

import {getFormatRating, getTextRating} from '../../helpers/utils';
import {IMovieOverviewProps} from './types';

const MovieOverview: React.FC<IMovieOverviewProps> = (
    {rating, ratingCount, description, director, starring}: IMovieOverviewProps) => {

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

export default MovieOverview;
