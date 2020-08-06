import * as React from 'react';
import {Subtract} from 'utility-types';
import {connect} from 'react-redux';

import {Operation as FilmsOperations} from '../../reducer/films/films';
import {getActiveFilm} from '../../reducer/state/selectors';

import {IDispatchToWithReviewProps, InjectedProps, IWithReviewProps, IWithReviewState} from './types';

const withReview = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = IWithReviewProps & Subtract<P, InjectedProps>;

  class WithReview extends React.PureComponent<T, IWithReviewState> {
    constructor(props: T) {
      super(props);

      this.state = {
        rating: 0,
        comment: ``,
      };

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleRatingChange = this.handleRatingChange.bind(this);
      this.handleCommentChange = this.handleCommentChange.bind(this);
    }

    private handleRatingChange(evt): void {
      const {value} = evt.target;

      this.setState({
        rating: value,
      });
    }

    private handleCommentChange(evt): void {
      const comment = evt.target.value;

      this.setState({
        comment,
      });
    }

    private handleSubmit(evt): void {
      const {onSubmit, film} = this.props;
      const {rating, comment} = this.state;

      evt.preventDefault();

      onSubmit(film.id, {
        rating,
        comment
      });
    }

    public render(): React.ReactElement {
      const {rating} = this.state;

      return <Component
        {...this.props}
        rating={rating}
        onRatingChange={this.handleRatingChange}
        onCommentChange={this.handleCommentChange}
        onSubmit={this.handleSubmit}
      />;
    }
  }

  const mapStateToProps = (state): IWithReviewProps => ({
    film: getActiveFilm(state)
  });

  const mapDispatchToProps = (dispatch): IDispatchToWithReviewProps => ({
    onSubmit: (review: object, id: number) => dispatch(FilmsOperations.postComment(review, id))
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithReview);
};

export default withReview;
