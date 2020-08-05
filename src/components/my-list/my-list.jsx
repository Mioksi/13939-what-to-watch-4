import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {Operation as FilmsOperation} from '../../reducer/films/films';
import {getFavoriteFilms} from '../../reducer/films/selectors';

import Footer from '../footer/footer.jsx';
import MoviesList from '../movies-list/movies-list.jsx';
import withActiveCard from '../../hocs/with-active-card/with-active-card';

import {AppRoute} from '../../common/consts';

const MoviesListWrapped = withActiveCard(MoviesList);

class MyList extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {loadFavoriteFilms} = this.props;

    loadFavoriteFilms();
  }

  render() {
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

MyList.propTypes = {
  loadFavoriteFilms: PropTypes.func.isRequired,
  films: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        [`run_time`]: PropTypes.number.isRequired,
        released: PropTypes.number.isRequired,
        [`background_image`]: PropTypes.string.isRequired,
        [`poster_image`]: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        [`scores_count`]: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        starring: PropTypes.arrayOf(
            PropTypes.string.isRequired
        ).isRequired,
      }).isRequired
  ).isRequired,
};

const mapStateToProps = (state) => ({
  films: getFavoriteFilms(state)
});

const mapDispatchToProps = (dispatch) => ({
  loadFavoriteFilms() {
    dispatch(FilmsOperation.loadFavoriteFilms());
  },
});

export {MyList};
export default connect(mapStateToProps, mapDispatchToProps)(MyList);
