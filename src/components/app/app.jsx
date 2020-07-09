import React, {PureComponent} from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';
import withTabs from '../../hocs/with-tabs/with-tabs';

const MoviePageWrapped = withTabs(MoviePage);

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: null
    };

    this._handleMovieCardClick = this._handleMovieCardClick.bind(this);
  }

  _handleMovieCardClick(id) {
    this.setState({
      activeCard: id,
    });
  }

  _renderMain() {
    return (
      <Main
        onCardTitleClick={this._handleMovieCardClick}
        onCardClick={this._handleMovieCardClick}
      />
    );
  }

  _renderMoviePage() {
    return (
      <MoviePageWrapped
        onCardClick={this._handleMovieCardClick}
        onCardTitleClick={this._handleMovieCardClick}
      />
    );
  }

  _renderApp() {
    const {activeCard} = this.state;

    if (activeCard) {
      return this._renderMoviePage();
    }

    return this._renderMain();
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-film">
            {this._renderMoviePage()}
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
