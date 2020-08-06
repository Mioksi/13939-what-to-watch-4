import * as React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {ActionCreator} from '../../reducer/state/state';
import {getSelectedFilm, getSimilarFilms} from '../../reducer/state/selectors';
import {getAuthorizationStatus} from '../../reducer/user/selectors';

import AddMyList from '../add-my-list/add-my-list';
import MoviesList from '../movies-list/movies-list';
import MovieDetails from './components/movie-details/movie-details';
import MovieOverview from './components/movie-overview/movie-overview';
import MovieReviews from './components/movie-reviews/movie-reviews';
import Header from '../header/header';
import Footer from '../footer/footer';
import withActiveCard from '../../hocs/with-active-card/with-active-card';

import {AppRoute, AuthorizationStatus} from '../../common/consts';
import {getLoadingFavoriteFilm} from '../../reducer/films/selectors';
import {Operation as FilmsOperation} from '../../reducer/films/films';

import {IDispatchToMoviePageProps, IStateToMoviePageProps, MoviePageProps} from './types';
import {Film} from '../../common/types';

const MoviesListWrapped = withActiveCard(MoviesList);

class MoviePage extends React.PureComponent<MoviePageProps> {
  constructor(props) {
    super(props);

    this.renderMovieOverview = this.renderMovieOverview.bind(this);
    this.renderMovieDetails = this.renderMovieDetails.bind(this);
  }

  componentDidMount(): void {
    const {film, setActiveFilm} = this.props;

    setActiveFilm(film);
  }

  componentDidUpdate(): void {
    const {film, setActiveFilm} = this.props;

    setActiveFilm(film);
  }

  private renderAddReviewButton(status: string, id: number): React.ReactElement {
    return status === AuthorizationStatus.AUTH
      ? <Link to={`${AppRoute.FILM}/${id}${AppRoute.ADD_REVIEW}`} className="btn movie-card__button">Add review</Link>
      : null;
  }

  private renderMovieOverview(): React.ReactElement {
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

  private renderMovieDetails(): React.ReactElement {
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

  private renderMovieReviews(): React.ReactElement {
    return <MovieReviews/>;
  }

  _renderActiveTab() {
    const {activeTab} = this.props;

    const tabTypes = {
      'Overview': this.renderMovieOverview,
      'Details': this.renderMovieDetails,
      'Reviews': this.renderMovieReviews
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

  public render(): React.ReactElement {
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
                  {this.renderAddReviewButton(authorizationStatus, id)}
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

const mapStateToProps = (state, props): IStateToMoviePageProps => ({
  film: getSelectedFilm(state, props.id),
  movies: getSimilarFilms(state),
  authorizationStatus: getAuthorizationStatus(state),
  isLoadingFavoriteFilm: getLoadingFavoriteFilm(state)
});

const mapDispatchToProps = (dispatch): IDispatchToMoviePageProps => ({
  setActiveFilm: (film: Film) => dispatch(ActionCreator.getActiveFilm(film)),
  loadFilms: () => dispatch(FilmsOperation.loadFilms())
});

export {MoviePage};
export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
