import React from 'react';
import PropTypes from 'prop-types';

import MovieReview from './components/movie-review.jsx';

const MovieReviews = ({reviews}) => {
  const getReview = (review, index) => {
    const key = `${review.id}-${index}`;

    return (
      <MovieReview
        key={key}
        review={review}
      />
    );
  };

  const renderReviews = () => reviews.map(getReview);

  return (
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {renderReviews()}
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
