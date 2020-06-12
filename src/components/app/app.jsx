import React from 'react';
import PropTypes from "prop-types";

import Main from '../main/main.jsx';

const App = ({movieTitle, movieGenre, movieYear, cardTitles}) => {
  return (
    <Main
      movieTitle={movieTitle}
      movieGenre={movieGenre}
      movieYear={movieYear}
      cardTitles={cardTitles}
    />
  );
};

App.propTypes = {
  movieTitle: PropTypes.string.isRequired,
  movieGenre: PropTypes.string.isRequired,
  movieYear: PropTypes.number.isRequired,
  cardTitles: PropTypes.arrayOf(PropTypes.string.isRequired),
};

export default App;
