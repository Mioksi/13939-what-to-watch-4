import React from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/state/state';
import PropTypes from 'prop-types';

import {getPromoFilm} from '../../reducer/data/selectors';
import {getShownMovies, getFilmsByGenre, getPlayerState} from '../../reducer/state/selectors';

import MoviesList from '../movies-list/movies-list.jsx';
import GenresList from '../genres-list/genres-list.jsx';
import ShowMore from '../show-more/show-more.jsx';
import FullScreenPlayer from '../full-screen-player/full-screen-player.jsx';
import withActiveCard from '../../hocs/with-active-card/with-active-card';
import withFullScreenPlayer from '../../hocs/with-full-screen-player/with-full-screen-player';

const FullScreenPlayerWrapped = withFullScreenPlayer(FullScreenPlayer);
const MoviesListWrapped = withActiveCard(MoviesList);

const Main = ({
  film: {
    title,
    genre,
    year,
    backgroundPoster,
    filmPoster
  },
  movies,
  shownMoviesCount,
  onShowMoreButtonClick,
  isPlayerActive,
  onFullscreenToggle}) => {

  const shownMovies = movies.slice(0, shownMoviesCount);
  const isShowMoreButtonHide = shownMoviesCount < movies.length;

  return (
    isPlayerActive ? (
      <FullScreenPlayerWrapped />
    ) : (
      <>
        <section className="movie-card">
          <div className="movie-card__bg">
            <img src={backgroundPoster} alt={title}/>
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <header className="page-header movie-card__head">
            <div className="logo">
              <a className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>
            <div className="user-block">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
              </div>
            </div>
          </header>
          <div className="movie-card__wrap">
            <div className="movie-card__info">
              <div className="movie-card__poster">
                <img src={filmPoster} alt={title} width="218" height="327"/>
              </div>
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{title}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{genre}</span>
                  <span className="movie-card__year">{year}</span>
                </p>
                <div className="movie-card__buttons">
                  <button onClick={onFullscreenToggle} className="btn btn--play movie-card__button" type="button">
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
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="page-content">
          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>
            <GenresList/>
            <MoviesListWrapped
              movies={shownMovies}
            />
            {isShowMoreButtonHide && <ShowMore
              onShowMoreButtonClick={onShowMoreButtonClick}
            />}
          </section>
          <footer className="page-footer">
            <div className="logo">
              <a className="logo__link logo__link--light">
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
    )
  );
};

Main.propTypes = {
  film: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    backgroundPoster: PropTypes.string.isRequired,
    filmPoster: PropTypes.string.isRequired,
  }).isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
  shownMoviesCount: PropTypes.number.isRequired,
  onShowMoreButtonClick: PropTypes.func.isRequired,
  isPlayerActive: PropTypes.bool.isRequired,
  onFullscreenToggle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  film: getPromoFilm(state),
  movies: getFilmsByGenre(state),
  shownMoviesCount: getShownMovies(state),
  isPlayerActive: getPlayerState(state),
});

const mapDispatchToProps = (dispatch) => ({
  onShowMoreButtonClick() {
    dispatch(ActionCreator.showMoreMovies());
  },
  onFullscreenToggle() {
    dispatch(ActionCreator.setFullscreenPlayer(true));
  }
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
