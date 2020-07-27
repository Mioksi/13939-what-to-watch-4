import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getComments} from '../../../../reducer/films/selectors';

import MovieReview from './components/movie-review.jsx';
import {Operation as DataOperation} from '../../../../reducer/films/films';
import {getActiveFilmId} from '../../../../reducer/state/selectors';

class MovieReviews extends React.PureComponent {
  componentDidMount() {
    this._loadComments();
  }

  _loadComments() {
    const {getFilmComments, activeFilmId} = this.props;

    getFilmComments(activeFilmId);
  }

  _getReview(review, index) {
    const key = `${review.id}-${index}`;

    return (
      <MovieReview
        key={key}
        review={review}
      />
    );
  }

  renderReviews(columnReviews) {
    return columnReviews.map(this._getReview);
  }

  render() {
    const {reviews} = this.props;

    const halfReviews = Math.ceil(reviews.length / 2);
    const firstColumn = reviews.slice(0, halfReviews);
    const secondColumn = reviews.slice(halfReviews);

    return (
      <div className="movie-card__reviews movie-card__row">
        <div className="movie-card__reviews-col">
          {this.renderReviews(firstColumn)}
        </div>
        <div className="movie-card__reviews-col">
          {this.renderReviews(secondColumn)}
        </div>
      </div>
    );
  }
}

MovieReviews.propTypes = {
  reviews: PropTypes.arrayOf({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
  activeFilmId: PropTypes.number.isRequired,
  getFilmComments: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  reviews: getComments(state),
  activeFilmId: getActiveFilmId(state)
});

const mapDispatchToProps = (dispatch) => ({
  getFilmComments(id) {
    dispatch(DataOperation.loadFilmComments(id));
  }
});

export {MovieReviews};
export default connect(mapStateToProps, mapDispatchToProps)(MovieReviews);
