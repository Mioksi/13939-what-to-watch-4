import React from 'react';
import PropTypes from "prop-types";

import Main from '../main/main.jsx';

const cardTitleHandler = () => {};

const App = ({movieTitle, movieGenre, movieYear, movies}) => {
  return (
    <Main
      movieTitle={movieTitle}
      movieGenre={movieGenre}
      movieYear={movieYear}
      movies={movies}
      onCardTitleClick={cardTitleHandler}
    />
  );
};

App.propTypes = {
  movieTitle: PropTypes.string.isRequired,
  movieGenre: PropTypes.string.isRequired,
  movieYear: PropTypes.number.isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
};

export default App;
