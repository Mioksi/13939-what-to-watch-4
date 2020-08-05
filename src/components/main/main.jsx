import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import {ActionCreator} from '../../reducer/state/state';
import {getLoadingFavoriteFilm, getPromoFilm} from '../../reducer/films/selectors';
import {getShownMovies, getFilmsByGenre} from '../../reducer/state/selectors';
import {Operation as FilmsOperation} from '../../reducer/films/films';

import AddMyList from '../add-my-list/add-my-list.jsx';
import MoviesList from '../movies-list/movies-list.jsx';
import GenresList from '../genres-list/genres-list.jsx';
import ShowMore from '../show-more/show-more.jsx';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import withActiveCard from '../../hocs/with-active-card/with-active-card';

import {AppRoute} from '../../common/consts';

const MoviesListWrapped = withActiveCard(MoviesList);

const Main = ({
  film: {
    id,
    name,
    genre,
    released,
    [`background_image`]: backgroundPoster,
    [`poster_image`]: filmPoster,
    [`is_favorite`]: isFavorite,
  }, films, shownMoviesCount, onShowMoreButtonClick, isLoadingFavoriteFilm, loadPromoFilm}) => {

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

Main.propTypes = {
  film: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      released: PropTypes.number.isRequired,
      [`background_image`]: PropTypes.string.isRequired,
      [`poster_image`]: PropTypes.string.isRequired,
      [`is_favorite`]: PropTypes.bool.isRequired
    }).isRequired,
  ]).isRequired,
  films: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          [`preview_image`]: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,
  ]).isRequired,
  shownMoviesCount: PropTypes.number.isRequired,
  onShowMoreButtonClick: PropTypes.func.isRequired,
  isLoadingFavoriteFilm: PropTypes.bool.isRequired,
  loadPromoFilm: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  film: getPromoFilm(state),
  films: getFilmsByGenre(state),
  shownMoviesCount: getShownMovies(state),
  isLoadingFavoriteFilm: getLoadingFavoriteFilm(state)
});

const mapDispatchToProps = (dispatch) => ({
  onShowMoreButtonClick() {
    dispatch(ActionCreator.showMoreMovies());
  },
  loadPromoFilm() {
    dispatch(FilmsOperation.loadPromoFilm());
  }
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
