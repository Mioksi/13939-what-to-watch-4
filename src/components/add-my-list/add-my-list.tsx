import * as React from 'react';
import {connect} from 'react-redux';

import {Operation as FilmsOperation} from '../../reducer/films/films';
import {getAuthorizationStatus} from '../../reducer/user/selectors';

import {AddMyListProps, IDispatchToAddMyListProps, IStateToAddMyListProps} from './types';

import {AppRoute, AuthorizationStatus} from '../../common/consts';

const AddMyList: React.FC<AddMyListProps> = (
    {id,
      isFavorite,
      authorizationStatus,
      onFavoriteButtonClick,
      history
    }: AddMyListProps) => {

  const handleFavoriteButtonClick = (): void => {
    return authorizationStatus === AuthorizationStatus.AUTH
      ? onFavoriteButtonClick(id, !isFavorite)
      : history.push(AppRoute.LOGIN);
  };

  return (
    <button onClick={() => handleFavoriteButtonClick()} className="btn btn--list movie-card__button" type="button">
      {isFavorite ?
        <svg viewBox="0 0 18 14" width="18" height="14">
          <use xlinkHref="#in-list"/>
        </svg> :
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add"/>
        </svg>
      }
      <span>My list</span>
    </button>
  );
};

const mapStateToProps = (state): IStateToAddMyListProps => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch): IDispatchToAddMyListProps => ({
  onFavoriteButtonClick: (id: number, isFavorite: boolean) => dispatch(FilmsOperation.postFavoriteFilm(id, isFavorite))
});

export {AddMyList};
export default connect(mapStateToProps, mapDispatchToProps)(AddMyList);
