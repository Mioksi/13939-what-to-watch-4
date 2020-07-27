import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getSelectedFilm} from '../../reducer/state/selectors';

import {ReviewLength, RATING_COUNT} from '../../common/consts';

const AddReview = ({film: {name, [`background_image`]: backgroundImage, [`poster_image`]: posterImage}}) => {

  const getRatingItem = (item, index) => {
    const id = `star-${index + 1}`;

    return (
      <Fragment key={id}>
        <input
          onChange={() => {}}
          className="rating__input"
          id={id}
          type="radio"
          name="rating"
          value={index}
        />
        <label className="rating__label" htmlFor={id}>Rating {index}</label>
      </Fragment>
    );
  };

  const ratingStars = new Array(RATING_COUNT).fill(``);

  const renderRatingMarkup = () => ratingStars.map(getRatingItem);

  return (
    <section className="movie-card movie-card--full">
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={backgroundImage} alt={name}/>
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header">
          <div className="logo">
            <a href="main.html" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a href="movie-page.html" className="breadcrumbs__link">{name}</a>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>
          <div className="user-block">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
            </div>
          </div>
        </header>
        <div className="movie-card__poster movie-card__poster--small">
          <img src={posterImage} alt={`${name} poster`} width="218" height="327"/>
        </div>
      </div>
      <div className="add-review">
        <form action="#" className="add-review__form">
          <div className="rating">
            <div className="rating__stars">
              {renderRatingMarkup()}
            </div>
          </div>
          <div className="add-review__text">
            <textarea
              onChange={() => {}}
              className="add-review__textarea"
              name="review-text"
              id="review-text"
              placeholder="Review text"
              minLength={ReviewLength.MIN}
              maxLength={ReviewLength.MAX}
              required
            />
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit">Post</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

AddReview.propTypes = {
  film: PropTypes.shape({
    name: PropTypes.string.isRequired,
    [`background_image`]: PropTypes.string.isRequired,
    [`poster_image`]: PropTypes.string.isRequired
  }).isRequired
};

const mapStateToProps = (state) => ({
  film: getSelectedFilm(state)
});

export {AddReview};
export default connect(mapStateToProps)(AddReview);
