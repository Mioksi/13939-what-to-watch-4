import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getFilms} from '../../reducer/films/selectors';
import {getSelectedFilm} from '../../reducer/state/selectors';
import {getAuthorizationStatus} from '../../reducer/user/selectors';

import MoviesList from '../movies-list/movies-list.jsx';
import MovieDetails from './components/movie-details/movie-details.jsx';
import MovieOverview from './components/movie-overview/movie-overview.jsx';
import MovieReviews from './components/movie-reviews/movie-reviews.jsx';
import Header from '../header/header.jsx';
import withActiveCard from '../../hocs/with-active-card/with-active-card';

import {AuthorizationStatus, TabType} from '../../common/consts';
import {getSimilarMovies} from './helpers/utils';

const MoviesListWrapped = withActiveCard(MoviesList);

const MoviePage = (
    {film: {
      name,
      genre,
      [`run_time`]: runTime,
      released,
      [`background_image`]: backgroundPoster,
      [`poster_image`]: filmPoster,
      rating,
      [`scores_count`]: ratingCount,
      description,
      director,
      starring
    }, movies, renderTabs, activeTab, authorizationStatus}) => {

  const similarMovies = getSimilarMovies(movies, genre);

  const renderActiveTab = () => {
    switch (activeTab) {
      case TabType.OVERVIEW:
        return <MovieOverview
          rating={rating}
          ratingCount={ratingCount}
          description={description}
          director={director}
          starring={starring}
        />;
      case TabType.DETAILS:
        return <MovieDetails
          director={director}
          genre={genre}
          runTime={runTime}
          starring={starring}
          year={released}
        />;
      case TabType.REVIEWS:
        return <MovieReviews/>;
      default:
        return ``;
    }
  };

  return (
    <>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={backgroundPoster} alt={name}/>
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <Header />
          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{released}</span>
              </p>
              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"/>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"/>
                  </svg>
                  <span>My list</span>
                </button>
                {authorizationStatus === AuthorizationStatus.AUTH ?
                  <a href="add-review.html" className="btn movie-card__button">Add review</a>
                  : null
                }
              </div>
            </div>
          </div>
        </div>
        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={filmPoster} alt={`${name} poster`} width="218" height="327"/>
            </div>
            <div className="movie-card__desc">
              {renderTabs()}
              {renderActiveTab()}
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <MoviesListWrapped
            movies={similarMovies}
          />
        </section>
        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>
          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

MoviePage.propTypes = {
  film: PropTypes.shape({
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    [`run_time`]: PropTypes.number.isRequired,
    released: PropTypes.number.isRequired,
    [`background_image`]: PropTypes.string.isRequired,
    [`poster_image`]: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    [`scores_count`]: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(
        PropTypes.string.isRequired
    ).isRequired,
  }).isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        [`preview_image`]: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
  renderTabs: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
  authorizationStatus: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  film: getSelectedFilm(state),
  movies: getFilms(state),
  authorizationStatus: getAuthorizationStatus(state)
});

export {MoviePage};
export default connect(mapStateToProps)(MoviePage);
