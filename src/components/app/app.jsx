import React from 'react';

import Main from '../main/main.jsx';

// eslint-disable-next-line react/prop-types
const App = ({movieTitle, movieGenre, movieYear}) => {
  return (
    <Main
      movieTitle={movieTitle}
      movieGenre={movieGenre}
      movieYear={movieYear}
    />
  );
};

export default App;
