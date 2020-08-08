import * as React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {getErrorStatus, getFormState} from '../../reducer/films/selectors';
import {getSelectedFilm} from '../../reducer/state/selectors';

import {AddReviewProps, IStateToAddReviewProps} from './types';

import {ReviewLength, RATING_COUNT, AppRoute} from '../../common/consts';

const AddReview: React.FC<AddReviewProps> = (
    {film: {
      id,
      name,
      [`background_image`]: backgroundImage,
      [`poster_image`]: posterImage
    },
    rating,
    onRatingChange,
    onCommentChange,
    onSubmit,
    isFormDisabled,
    isErrorLoading}: AddReviewProps) => {

  const getRatingItem = (item, index): React.ReactElement => {
    const key = `star-${index + 1}`;

    return (
      <React.Fragment key={key}>
        <input
          onChange={onRatingChange}
          className="rating__input"
          id={key}
          type="radio"
          name="rating"
          value={index + 1}
          disabled={isFormDisabled}
        />
        <label className="rating__label" htmlFor={key}>Rating {index}</label>
      </React.Fragment>
    );
  };

  const ratingStars = new Array(RATING_COUNT).fill(``);

  const renderRatingMarkup = ratingStars.map(getRatingItem);

  const getErrorMessage = (): React.ReactElement => {
    return isErrorLoading ? (
      <p style={{color: `red`, textAlign: `center`}}>Sending error. Please, try again.</p>
    ) : null;
  };

  return (
    <section className="movie-card movie-card--full">
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={backgroundImage} alt={name}/>
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header">
          <div className="logo">
            <Link to={AppRoute.ROOT} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`${AppRoute.FILM}/${id}`} className="breadcrumbs__link">{name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>
          <div className="user-block">
            <Link to={AppRoute.MY_LIST}>
              <div className="user-block__avatar">
                <img src="/img/avatar.jpg" alt="User avatar" width="63" height="63"/>
              </div>
            </Link>
          </div>
        </header>
        <div className="movie-card__poster movie-card__poster--small">
          <img src={posterImage} alt={`${name} poster`} width="218" height="327"/>
        </div>
      </div>
      <div className="add-review">
        <p style={{color: `red`, textAlign: `center`}}>{getErrorMessage()}</p>
        <form onSubmit={onSubmit} action="#" className="add-review__form">
          <div className="rating">
            <div className="rating__stars">
              {renderRatingMarkup}
            </div>
          </div>
          <div className="add-review__text">
            <textarea
              onChange={onCommentChange}
              className="add-review__textarea"
              name="review-text"
              id="review-text"
              placeholder="Review text"
              minLength={ReviewLength.MIN}
              maxLength={ReviewLength.MAX}
              required
              disabled={isFormDisabled}
            />
            <div className="add-review__submit">
              <button
                className="add-review__btn"
                type="submit"
                disabled={isFormDisabled || (rating === 0)}>
              Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

const mapStateToProps = (state, props): IStateToAddReviewProps => ({
  film: getSelectedFilm(state, props.id),
  isErrorLoading: getErrorStatus(state),
  isFormDisabled: getFormState(state)
});

export {AddReview};
export default connect(mapStateToProps)(AddReview);
