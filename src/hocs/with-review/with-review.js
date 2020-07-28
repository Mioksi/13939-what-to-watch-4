import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";

import {Operation as FilmsOperations} from '../../reducer/films/films';
import {getActiveFilmId} from '../../reducer/state/selectors';

const withReview = (Component) => {
  class WithReview extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: 1,
        comment: ``,
      };

      this._handleSubmit = this._handleSubmit.bind(this);
      this._handleRatingChange = this._handleRatingChange.bind(this);
    }

    _handleRatingChange(evt) {
      const value = evt.target;

      this.setState({
        [name]: value,
      });
    }

    _handleSubmit(evt) {
      const {onSubmit, activeFilmId} = this.props;
      const {rating, comment} = this.state;

      evt.preventDefault();

      onSubmit(activeFilmId, {
        rating,
        comment
      });
    }

    render() {
      return <Component
        {...this.props}
        onChangeHandler={this._handleRatingChange}
        onSubmitHandler={this._handleSubmit}
      />;
    }
  }

  WithReview.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    activeFilmId: PropTypes.number.isRequired
  };

  const mapStateToProps = (state) => ({
    activeFilmId: getActiveFilmId(state),
  });

  const mapDispatchToProps = (dispatch) => ({
    onSubmit(review, id) {
      dispatch(FilmsOperations.postComment(review, id));
    },
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithReview);
};

export default withReview;
