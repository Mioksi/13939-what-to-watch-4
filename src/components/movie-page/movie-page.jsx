import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import {ActionCreator} from '../../reducer/state/state';
import {getSelectedFilm, getSimilarFilms} from '../../reducer/state/selectors';
import {getAuthorizationStatus} from '../../reducer/user/selectors';

import MoviesList from '../movies-list/movies-list.jsx';
import MovieDetails from './components/movie-details/movie-details.jsx';
import MovieOverview from './components/movie-overview/movie-overview.jsx';
import MovieReviews from './components/movie-reviews/movie-reviews.jsx';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import withActiveCard from '../../hocs/with-active-card/with-active-card';

import {AppRoute, AuthorizationStatus, TabType} from '../../common/consts';

const MoviesListWrapped = withActiveCard(MoviesList);

class MoviePage extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {film, setActiveFilm} = this.props;

    setActiveFilm(film);
  }

  _renderAddReviewButton(status, id) {
    return status === AuthorizationStatus.AUTH ?
      <Link to={`${AppRoute.FILM}/${id}${AppRoute.ADD_REVIEW}`} className="btn movie-card__button">Add review</Link>
      : null;
  }

  _renderActiveTab() {
    const {film, activeTab} = this.props;
    const {genre,
      [`run_time`]: runTime,
      released,
      rating,
      [`scores_count`]: ratingCount,
      description,
      director,
      starring
    } = film;

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
        return null;
    }
  }

  _renderSimilarMovies() {
    const {movies} = this.props;

    return movies.length > 0 ? (
      <section className="catalog catalog--like-this">
        <h2 className="catalog__title">More like this</h2>
        <MoviesListWrapped
          movies={movies}
        />
      </section>
    ) : null;
  }

  render() {
    const {film: {
      id,
      name,
      genre,
      released,
      [`background_image`]: backgroundPoster,
      [`poster_image`]: filmPoster,
    }, renderTabs, authorizationStatus} = this.props;

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
                  <Link to={`${AppRoute.PLAYER}/${id}`} className="btn btn--play movie-card__button" type="button">
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"/>
                    </svg>
                    <span>Play</span>
                  </Link>
                  <button className="btn btn--list movie-card__button" type="button">
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"/>
                    </svg>
                    <span>My list</span>
                  </button>
                  {this._renderAddReviewButton(authorizationStatus, id)}
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
                {this._renderActiveTab()}
              </div>
            </div>
          </div>
        </section>
        <div className="page-content">
          {this._renderSimilarMovies()}
          <Footer />
        </div>
      </>
    );
  }
}

MoviePage.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.number.isRequired,
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
  authorizationStatus: PropTypes.string.isRequired,
  setActiveFilm: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => ({
  film: getSelectedFilm(state, props.id),
  movies: getSimilarFilms(state),
  authorizationStatus: getAuthorizationStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  setActiveFilm(film) {
    dispatch(ActionCreator.getActiveFilm(film));
  }
});

export {MoviePage};
export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
