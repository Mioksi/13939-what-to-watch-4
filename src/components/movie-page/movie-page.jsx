import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import {ActionCreator} from '../../reducer/state/state';
import {getSelectedFilm, getSimilarFilms} from '../../reducer/state/selectors';
import {getAuthorizationStatus} from '../../reducer/user/selectors';

import AddMyList from '../add-my-list/add-my-list.jsx';
import MoviesList from '../movies-list/movies-list.jsx';
import MovieDetails from './components/movie-details/movie-details.jsx';
import MovieOverview from './components/movie-overview/movie-overview.jsx';
import MovieReviews from './components/movie-reviews/movie-reviews.jsx';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import withActiveCard from '../../hocs/with-active-card/with-active-card';

import {AppRoute, AuthorizationStatus} from '../../common/consts';
import {getLoadingFavoriteFilm} from '../../reducer/films/selectors';
import {Operation as FilmsOperation} from '../../reducer/films/films';

const MoviesListWrapped = withActiveCard(MoviesList);

class MoviePage extends PureComponent {
  constructor(props) {
    super(props);

    this._renderMovieOverview = this._renderMovieOverview.bind(this);
    this._renderMovieDetails = this. _renderMovieDetails.bind(this);
  }

  componentDidMount() {
    const {film, setActiveFilm} = this.props;

    setActiveFilm(film);
  }

  componentDidUpdate() {
    const {film, setActiveFilm} = this.props;

    setActiveFilm(film);
  }

  _renderAddReviewButton(status, id) {
    return status === AuthorizationStatus.AUTH
      ? <Link to={`${AppRoute.FILM}/${id}${AppRoute.ADD_REVIEW}`} className="btn movie-card__button">Add review</Link>
      : null;
  }

  _renderMovieOverview() {
    const {film} = this.props;
    const {rating, [`scores_count`]: ratingCount, description, director, starring} = film;

    return (
      <MovieOverview
        rating={rating}
        ratingCount={ratingCount}
        description={description}
        director={director}
        starring={starring}
      />
    );
  }

  _renderMovieDetails() {
    const {film} = this.props;
    const {genre, [`run_time`]: runTime, released, director, starring} = film;

    return (
      <MovieDetails
        director={director}
        genre={genre}
        runTime={runTime}
        starring={starring}
        year={released}
      />
    );
  }

  _renderMovieReviews() {
    return <MovieReviews/>;
  }

  _renderActiveTab() {
    const {activeTab} = this.props;

    const tabTypes = {
      'Overview': this._renderMovieOverview,
      'Details': this._renderMovieDetails,
      'Reviews': this._renderMovieReviews
    };

    return tabTypes[activeTab]();
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
      [`is_favorite`]: isFavorite,
    }, renderTabs, authorizationStatus, isLoadingFavoriteFilm, loadFilms} = this.props;

    if (isLoadingFavoriteFilm) {
      loadFilms();
    }

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
                  <AddMyList
                    id={id}
                    isFavorite={isFavorite}
                  />
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
    [`is_favorite`]: PropTypes.bool.isRequired,
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
  setActiveFilm: PropTypes.func.isRequired,
  isLoadingFavoriteFilm: PropTypes.bool.isRequired,
  loadFilms: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => ({
  film: getSelectedFilm(state, props.id),
  movies: getSimilarFilms(state),
  authorizationStatus: getAuthorizationStatus(state),
  isLoadingFavoriteFilm: getLoadingFavoriteFilm(state)
});

const mapDispatchToProps = (dispatch) => ({
  setActiveFilm(film) {
    dispatch(ActionCreator.getActiveFilm(film));
  },
  loadFilms() {
    dispatch(FilmsOperation.loadFilms());
  }
});

export {MoviePage};
export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
