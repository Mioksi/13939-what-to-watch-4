import * as React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {ActionCreator} from '../../reducer/state/state';
import {getLoadingFavoriteFilm, getPromoFilm} from '../../reducer/films/selectors';
import {getShownMovies, getFilmsByGenre} from '../../reducer/state/selectors';
import {Operation as FilmsOperation} from '../../reducer/films/films';

import AddMyList from '../add-my-list/add-my-list';
import MoviesList from '../movies-list/movies-list';
import GenresList from '../genres-list/genres-list';
import ShowMore from '../show-more/show-more';
import Header from '../header/header';
import Footer from '../footer/footer';
import withActiveCard from '../../hocs/with-active-card/with-active-card';

import {IDispatchToMainProps, IStateToMainProps, MainProps} from './types';

import {AppRoute} from '../../common/consts';

const MoviesListWrapped = withActiveCard(MoviesList);

const Main: React.FC<MainProps> = ({
  film: {
    id,
    name,
    genre,
    released,
    [`background_image`]: backgroundPoster,
    [`poster_image`]: filmPoster,
    [`is_favorite`]: isFavorite,
  }, films, shownMoviesCount, onShowMoreButtonClick, isLoadingFavoriteFilm, loadPromoFilm}: MainProps) => {

  const isShowMoreButtonHide = shownMoviesCount < films.length;

  if (isLoadingFavoriteFilm) {
    loadPromoFilm();
  }

  return (
    <>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={backgroundPoster} alt={name}/>
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <Header />
        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src={filmPoster} alt={name} width="218" height="327"/>
            </div>
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
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList/>
          <MoviesListWrapped movies={films} />
          {isShowMoreButtonHide && <ShowMore
            onShowMoreButtonClick={onShowMoreButtonClick}
          />}
        </section>
        <Footer />
      </div>
    </>
  );
};

const mapStateToProps = (state): IStateToMainProps => ({
  film: getPromoFilm(state),
  films: getFilmsByGenre(state),
  shownMoviesCount: getShownMovies(state),
  isLoadingFavoriteFilm: getLoadingFavoriteFilm(state)
});

const mapDispatchToProps = (dispatch): IDispatchToMainProps => ({
  onShowMoreButtonClick: () => dispatch(ActionCreator.showMoreMovies()),
  loadPromoFilm: () => dispatch(FilmsOperation.loadPromoFilm())
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
