import * as React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {getAuthorizationStatus} from '../../reducer/user/selectors';

import {IPrivateRouteProps, IStateToPrivateRouterProps} from './types';

import {AuthorizationStatus, AppRoute} from '../../common/consts';

const PrivateRoute: React.FC<IPrivateRouteProps> = (props: IPrivateRouteProps) => {
  const {render, path, exact, authorizationStatus} = props;

  const getStatus = (routeProps): object => {
    return (
      authorizationStatus === AuthorizationStatus.AUTH
        ? render(routeProps)
        : <Redirect to={AppRoute.LOGIN} />
    );
  };

  return (
    <Route
      path={path}
      exact={exact}
      render={getStatus}
    />
  );
};

const mapStateToProps = (state): IStateToPrivateRouterProps => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
