import React from 'react';
import PropTypes from 'prop-types';
import {MAX_GENRES} from '../../common/consts';

const GenresList = (props) => {
  const {allGenres, activeGenre, onGenreClick} = props;

  const setActiveClass = (genre) => {
    return activeGenre === genre ? `catalog__genres-item--active` : ``;
  };

  const getGenre = (genre, i) => {
    const genreClass = `catalog__genres-item ${setActiveClass(genre)}`;
    const key = `${genre} + ${i}`;

    return (
      <li
        className={genreClass}
        key={key}
      >
        <a onClick={handleGenreClick(genre)} href="#" className="catalog__genres-link">{genre}</a>
      </li>
    );
  };

  const renderGenres = () => allGenres.slice(0, MAX_GENRES).map(getGenre);

  const handleGenreClick = (genre) => {
    return (evt) => {
      evt.preventDefault();
      onGenreClick(genre);
    };
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

export default GenresList;
