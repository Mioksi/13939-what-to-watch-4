import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer';

import {MAX_GENRES} from '../../common/consts';

const setActiveClass = (activeGenre, genre) => {
  return activeGenre === genre ? `catalog__genres-item--active` : ``;
};

const getGenre = (genre, i, activeGenre, onGenreClick) => {
  const genreClass = `catalog__genres-item ${setActiveClass(activeGenre, genre)}`;
  const key = `${genre} + ${i}`;

  const handleGenreClick = () => {
    return (evt) => {
      evt.preventDefault();
      onGenreClick(genre);
    };
  };

  return (
    <li
      className={genreClass}
      key={key}
    >
      <a onClick={handleGenreClick()} href="#" className="catalog__genres-link">{genre}</a>
    </li>
  );
};

const GenresList = ({allGenres, activeGenre, onGenreClick}) => {
  const renderGenres = () => {
    return allGenres.slice(0, MAX_GENRES).map((genre, i) => getGenre(genre, i, activeGenre, onGenreClick));
  };

  return (
    <ul className="catalog__genres-list">
      {renderGenres()}
    </ul>
  );
};

GenresList.propTypes = {
  allGenres: PropTypes.arrayOf(
      PropTypes.string.isRequired
  ).isRequired,
  activeGenre: PropTypes.string.isRequired,
  onGenreClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeGenre: state.genre,
  allGenres: state.genresList,
});

const mapDispatchToProps = (dispatch) => ({
  onGenreClick(genre) {
    dispatch(ActionCreator.changeGenre(genre));
    dispatch(ActionCreator.getMoviesByGenre(genre));
    dispatch(ActionCreator.resetShownMovies());
  },
});

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);