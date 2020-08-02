import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";

import {Operation as FilmsOperations} from '../../reducer/films/films';
import {getActiveFilm} from '../../reducer/state/selectors';

const withReview = (Component) => {
  class WithReview extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: 0,
        comment: ``,
      };

      this._handleSubmit = this._handleSubmit.bind(this);
      this._handleRatingChange = this._handleRatingChange.bind(this);
      this._handleCommentChange = this._handleCommentChange.bind(this);
    }

    _handleRatingChange(evt) {
      const {name, value} = evt.target;

      this.setState({
        [name]: value,
      });
    }

    _handleCommentChange(evt) {
      const comment = evt.target.value;

      this.setState({
        comment,
      });
    }

    _handleSubmit(evt) {
      const {onSubmit, film} = this.props;
      const {rating, comment} = this.state;

      evt.preventDefault();

      onSubmit(film.id, {
        rating,
        comment
      });
    }

    render() {
      return <Component
        {...this.props}
        onRatingChange={this._handleRatingChange}
        onCommentChange={this._handleCommentChange}
        onSubmit={this._handleSubmit}
      />;
    }
  }

  WithReview.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    film: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired
  };

  const mapStateToProps = (state) => ({
    film: getActiveFilm(state),
  });

  const mapDispatchToProps = (dispatch) => ({
    onSubmit(review, id) {
      dispatch(FilmsOperations.postComment(review, id));
    },
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithReview);
};

export default withReview;
