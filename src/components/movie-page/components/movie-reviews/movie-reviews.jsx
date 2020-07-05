import React from 'react';
import PropTypes from 'prop-types';

import MovieReview from './components/movie-review.jsx';

const getReview = (review, index) => {
  const key = `${review.id}-${index}`;

  return (
    <MovieReview
      key={key}
      review={review}
    />
  );
};

const MovieReviews = ({reviews}) => {
  const halfReviews = reviews.length / 2;
  const firstColumn = reviews.slice(0, halfReviews);
  const secondColumn = reviews.slice(halfReviews);

  const renderReviews = (columnReviews) => columnReviews.map(getReview);

  return (
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {renderReviews(firstColumn)}
      </div>
      <div className="movie-card__reviews-col">
        {renderReviews(secondColumn)}
      </div>
    </div>
  );
};

MovieReviews.propTypes = {
  reviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        author: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
};

export default MovieReviews;
