import * as React from 'react';
import {connect} from 'react-redux';

import {Operation as FilmsOperation} from '../../../../reducer/films/films';
import {getActiveFilm} from '../../../../reducer/state/selectors';
import {getComments, getLoadingCommentsState} from '../../../../reducer/films/selectors';

import MovieReview from './components/movie-review';
import Preloader from '../../../preloader/preloader';
import {IDispatchToMovieReviewsProps, IStateToMovieReviewsProps, MovieReviewProps} from './types';
import {Review, Reviews} from '../../../../common/types';

class MovieReviews extends React.PureComponent<MovieReviewProps> {
  componentDidMount(): void {
    const {film, getFilmComments} = this.props;

    getFilmComments(film.id);
  }

  componentDidUpdate(prevProps): void {
    const {getFilmComments, film} = this.props;

    if (prevProps.film.id !== film.id) {
      getFilmComments(film.id);
    }
  }

  private readonly getReview = (review: Review, index: number): React.ReactElement => {
    const key = `${review.id}-${index}`;

    const {user, date, rating, comment} = review;
    const {name} = user;

    return (
      <MovieReview
        key={key}
        name={name}
        date={date}
        rating={rating}
        comment={comment}
      />
    );
  }

  private renderReviews(columnReviews: Reviews): React.ReactNodeArray {
    return columnReviews.map(this.getReview);
  }

  public render(): React.ReactElement {
    const {reviews, isLoadingComments} = this.props;

    const halfReviews = Math.ceil(reviews.length / 2);
    const firstColumn = reviews.slice(0, halfReviews);
    const secondColumn = reviews.slice(halfReviews);

    return isLoadingComments ? <Preloader /> : (
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

const mapStateToProps = (state): IStateToMovieReviewsProps => ({
  reviews: getComments(state),
  film: getActiveFilm(state),
  isLoadingComments: getLoadingCommentsState(state)
});

const mapDispatchToProps = (dispatch): IDispatchToMovieReviewsProps => ({
  getFilmComments: (id: number) => dispatch(FilmsOperation.loadFilmComments(id))
});

export {MovieReviews};
export default connect(mapStateToProps, mapDispatchToProps)(MovieReviews);
