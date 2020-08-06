import * as React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {Operation as FilmsOperation} from '../../reducer/films/films';
import {getFavoriteFilms} from '../../reducer/films/selectors';

import Footer from '../footer/footer';
import MoviesList from '../movies-list/movies-list';
import withActiveCard from '../../hocs/with-active-card/with-active-card';

import {IDispatchToMyListProps, IStateToMyListProps, MyListProps} from './types';

import {AppRoute} from '../../common/consts';

const MoviesListWrapped = withActiveCard(MoviesList);

class MyList extends React.PureComponent<MyListProps> {
  componentDidMount(): void {
    const {loadFavoriteFilms} = this.props;

    loadFavoriteFilms();
  }

  public render(): React.ReactElement {
    const {films} = this.props;

    return (
      <>
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <Link to={AppRoute.ROOT} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>
          <h1 className="page-title user-page__title">My list</h1>
          <div className="user-block">
            <div className="user-block__avatar">
              <Link to={AppRoute.MY_LIST}>
                <img src="/img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </Link>
            </div>
          </div>
        </header>
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <MoviesListWrapped
            movies={films}
          />
        </section>

        <Footer />
      </div>
    </>);
  }
}

const mapStateToProps = (state): IStateToMyListProps => ({
  films: getFavoriteFilms(state)
});

const mapDispatchToProps = (dispatch): IDispatchToMyListProps => ({
  loadFavoriteFilms: () => dispatch(FilmsOperation.loadFavoriteFilms())
});

export {MyList};
export default connect(mapStateToProps, mapDispatchToProps)(MyList);
