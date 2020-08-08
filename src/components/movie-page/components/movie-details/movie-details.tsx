import * as React from 'react';

import {IMovieDetailsProps} from './types';

const getStarring = (starringItem: string, i: number): React.ReactElement => {
  const key = `${starringItem} + ${i}`;

  return (
    <React.Fragment key={key}>
      {starringItem} <br />
    </React.Fragment>
  );
};

const renderStarring = (starring: string[]): React.ReactNodeArray => starring.map(getStarring);

const MovieDetails: React.FC<IMovieDetailsProps> = ({director, starring, genre, runTime, year}: IMovieDetailsProps) => {
  return (
    <div className="movie-card__text movie-card__row">
      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Director</strong>
          <span className="movie-card__details-value">{director}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Starring</strong>
          <span className="movie-card__details-value">{renderStarring(starring)}</span>
        </p>
      </div>
      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Run Time</strong>
          <span className="movie-card__details-value">{runTime}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Genre</strong>
          <span className="movie-card__details-value">{genre}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Released</strong>
          <span className="movie-card__details-value">{year}</span>
        </p>
      </div>
    </div>
  );
};

export default MovieDetails;
