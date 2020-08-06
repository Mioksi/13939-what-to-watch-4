import * as React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {getAuthorizationStatus} from '../../reducer/user/selectors';

import {IHeaderProps} from './types';

import {AuthorizationStatus, AppRoute} from '../../common/consts';

const getSingInLink = (): React.ReactElement => {
  return (
    <Link to={AppRoute.LOGIN} className="user-block__link">Sign in</Link>
  );
};

const getUserBlock = (): React.ReactElement => {
  return (
    <Link to={AppRoute.MY_LIST}>
      <div className="user-block__avatar">
        <img src="/img/avatar.jpg" alt="User avatar" width="63" height="63"/>
      </div>
    </Link>
  );
};

const renderUserBlock = (status: string): React.ReactElement => {
  return (status === AuthorizationStatus.AUTH) ? getUserBlock() : getSingInLink();
};

const Header: React.FC<IHeaderProps> = ({authorizationStatus}: IHeaderProps) => {
  return (
    <header className="page-header movie-card__head">
      <div className="logo">
        <Link to={AppRoute.ROOT} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>
      <div className="user-block">
        {renderUserBlock(authorizationStatus)}
      </div>
    </header>
  );
};

const mapStateToProps = (state): IHeaderProps => ({
  authorizationStatus: getAuthorizationStatus(state)
});

export {Header};
export default connect(mapStateToProps)(Header);
